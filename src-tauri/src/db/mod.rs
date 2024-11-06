use serde::{Deserialize, Serialize};
use sqlx::{ConnectOptions, MySql, MySqlPool, Pool, Row};
use sqlx::mysql::MySqlPoolOptions;
use tokio::sync::OnceCell;

use crate::DB_POOL;
use crate::utils::get_env;

pub async fn establish_connection() -> Pool<MySql> {
    let db_url = get_env("DATABASE_URL");

    // 创建 MySQL 数据库连接池
    let pool = MySqlPoolOptions::new()
        .max_connections(5)
        .connect(&db_url)
        .await
        .expect("Failed to create pool");

    pool
}

#[derive(Serialize, Deserialize)]
struct AppleId {
    id: i32,
    apple_id: String,
    apple_pwd: String,
    has_used: bool,
}

pub async fn get_apple_id() -> Result<AppleId, sqlx::Error> {
    let sql_query = "SELECT * FROM apple_id  WHERE has_used = false LIMIT 1";
    let row = sqlx::query(sql_query).fetch_one(&*DB_POOL).await?;

    Ok(AppleId {
        id: row.get("id"),
        apple_id: row.get("config_apple_id"),
        apple_pwd: row.get("config_apple_pwd"),
        has_used: row.get("has_used"),
    })
}

#[tauri::command]
pub async fn get_apple_id_api() -> String {
    let res = get_apple_id().await.unwrap().apple_id;
    res
}