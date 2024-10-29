use std::path::Path;
use std::time;

use lazy_static::lazy_static;
use tokio::sync::Mutex as AsyncMutex;
use tokio::time::timeout;

use crate::utils::read;

lazy_static! {
    pub static ref VMRUNEXE: AsyncMutex<&'static str> =
        AsyncMutex::new("C:\\Program Files (x86)\\VMware\\VMware Workstation\\vmrun.exe");
    pub static ref RUNNING_VMS: AsyncMutex<u8> = AsyncMutex::new(0);
    pub static ref VM_NAME: AsyncMutex<String> = AsyncMutex::new(String::new());
}

pub fn parse_runnings(run_result: &str) -> u8 {
    let mut result: u8 = 0;
    if !run_result.is_empty() {
        if let Some(str) = run_result.split('\r').next() {
            if !str.is_empty() {
                if let Ok(parsed) = str.replace("Total running VMs:", "").trim().parse::<u8>() {
                    result = parsed;
                }
            }
        }
    }
    result
}

pub async fn vmrun(args: Vec<String>) -> String {
    let output = tokio::process::Command::new(VMRUNEXE.lock().await.to_string())
        .args(args)
        .output()
        .await
        .expect("Failed to execute command");

    if output.status.success() {
        String::from_utf8_lossy(&output.stdout).to_string()
    } else {
        let error = String::from_utf8_lossy(&output.stderr);
        format!("Error executing command: {}", error)
    }
}

#[tauri::command]
pub async fn vmrun_list() -> (&'static str, usize) {
    let res = vmrun(vec!["-T".to_string(), "ws".to_string(), "list".to_string()]).await;
    let vm_number = res.lines().count() - 1;
    if vm_number > 0 {
        let res_static: &'static str = Box::leak(res.into_boxed_str());
        (res_static, vm_number)
    } else {
        ("0", 0)
    }
}

pub async fn vm_work(i: String, index: usize) {
    let one_sec = time::Duration::from_secs(1);
    if !i.contains("Total running VMs:") {
        let path = Path::new(&i);
        if let Some(vm_name_os) = path.file_stem() {
            if let Some(vm_name) = vm_name_os.to_str() {
                let guest_path = path.display().to_string();

                let mut vm_name_lock = VM_NAME.lock().await;
                *vm_name_lock = vm_name.to_string();
                drop(vm_name_lock); // Explicitly drop the lock to avoid holding it during the async call

                vmrun_copy_file_from_guest_to_host(index, vm_name.to_string(), guest_path.clone())
                    .await;
                tokio::time::sleep(one_sec).await;
            }
        }
    }
}

pub async fn vmrun_copy_file_from_guest_to_host(index: usize, vm_name: String, guest_vmx: String) {
    println!("  > 线程  {}", index);
    println!("  > {} ==> 检查ID", vm_name);
    println!();
    let vm_path = format!("D:\\vm-sms\\{}.txt", vm_name);
    let guest_path = "/Users/cc/apple-id.txt".to_string();
    let vm_path_clone = vm_path.clone();
    let guest_vmx_clone = guest_vmx.clone();
    let guest_path_clone = guest_path.clone();

    let _ = timeout(
        time::Duration::from_secs(20),
        vmrun(vec![
            "-T".to_string(),
            "ws".to_string(),
            "-gu".to_string(),
            "cc".to_string(),
            "-gp".to_string(),
            "123456".to_string(),
            "copyFileFromGuestToHost".to_string(),
            guest_vmx_clone,
            guest_path_clone,
            vm_path_clone,
        ]),
    )
        .await;

    let content = read(&vm_path).unwrap_or_default();
    // if !content.is_empty() {
    //     apple_id_upload(index, &vm_name, content.clone())
    //         .await
    //         .unwrap();
    // }

    let guest_vmx_clone = guest_vmx.clone();
    let guest_path_clone = guest_path.clone();
    let _ = timeout(
        time::Duration::from_secs(20),
        vmrun(vec![
            "-T".to_string(),
            "ws".to_string(),
            "-gu".to_string(),
            "cc".to_string(),
            "-gp".to_string(),
            "123456".to_string(),
            "deleteFileInGuest".to_string(),
            guest_vmx_clone,
            guest_path_clone,
        ]),
    )
        .await;
}