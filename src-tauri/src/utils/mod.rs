#[tauri::command]
pub fn get_env_var(key: &str) -> String {
    match dotenv::var(key) {
        Ok(v) => { v }
        Err(_) => { "".to_string() }
    }
}