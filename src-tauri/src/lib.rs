// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/

use lazy_static::lazy_static;
use sqlx::{MySql, MySqlPool, Pool};
use sqlx::mysql::{MySqlConnectOptions, MySqlPoolOptions};
use tokio::sync::OnceCell;

use crate::db::establish_connection;

pub mod utils;
pub mod vm;
pub mod db;


lazy_static! {
     pub static ref DB_POOL: MySqlPool =  {

        tokio::runtime::Runtime::new().unwrap().block_on(
            async {
        let db_url = utils::get_env("DB_URL");
       let pool = MySqlPoolOptions::new()
        .max_connections(100)
        .connect(&db_url)
        .await
        .expect("Failed to create pool");

    pool}
        )

    };
}
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {

    // 数据库初始化
    tauri::async_runtime::spawn(async {
        establish_connection().await;
    });


    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::default().build())
        .plugin(tauri_plugin_clipboard_manager::init())
        // .plugin(tauri_plugin_updater::Builder::new().build())
        .plugin(tauri_plugin_sql::Builder::new().build())
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_notification::init())
        // .plugin(tauri_plugin_localhost::Builder::new(todo!()).build())
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_log::Builder::new().build())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_persisted_scope::init())
        .invoke_handler(tauri::generate_handler![utils::get_env_var, vm::vmrun_list, vm::vmrun_clone, vm::vmrun_write, db::get_apple_id_api])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
