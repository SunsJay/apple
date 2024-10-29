#[tauri::command]
pub fn get_env_var(key: &str) -> String {
    let env_file_path = Path::new(".").join(".env");
    match dotenv(env_file_path) {
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