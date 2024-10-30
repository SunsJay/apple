use std::env;
use std::fs::File;
use std::io::{self, Read};
use std::time::{SystemTime, UNIX_EPOCH};

use dotenv::dotenv;

#[tauri::command]
pub fn get_env_var(key: &str) -> String {
    let mut env_file_path = String::new();

    // 根据操作系统类型设置不同的路径
    #[cfg(target_os = "windows")]
    {
        env_file_path = "C:\\Program Files\\apple".to_string();
    }

    #[cfg(target_os = "macos")]
    {
        env_file_path = "/Users/sunsjay/Desktop".to_string();
    }

    // 设置当前工作目录
    std::env::set_current_dir(&env_file_path).unwrap();

    // 加载.env文件中的环境变量
    match dotenv() {
        Ok(_) => {
            match env::var(key) {
                Ok(val) => val,
                Err(_) => "".to_string()
            }
        }
        Err(_) => {
            "".to_string()
        }
    }
}


pub fn read(filename: &str) -> Result<String, io::Error> {
    let mut contents = String::new();

    let res = File::open(filename);

    match res {
        Ok(mut file) => {
            let res = file.read_to_string(&mut contents);
            match res {
                Ok(_) => delete(filename)?,
                Err(e) => match e.kind() {
                    io::ErrorKind::NotFound => {}
                    _ => return Err(e),
                },
            }
        }
        Err(e) => match e.kind() {
            io::ErrorKind::NotFound => {}
            _ => return Err(e),
        },
    }

    Ok(contents)
}

fn delete(filename: &str) -> Result<(), io::Error> {
    std::fs::remove_file(filename)?;
    Ok(())
}

pub fn get_timestamp() -> String {
    let now = SystemTime::now();
    let since_the_epoch = now.duration_since(UNIX_EPOCH).expect("Time went backwards");
    since_the_epoch.as_secs().to_string()
}