<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "library";
$message = "";

$conn = new mysqli($servername, $username, $password);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $action = $_POST['action'];

    switch ($action) {
    case "create_db":
        $message = "❌ Cannot create database: Your hosting provider does not allow creating new databases from PHP. Use the control panel to manage databases.";
        break;

    case "delete_db":
        $message = "❌ Cannot delete database: Dropping databases is restricted on this hosting. Use the control panel if needed.";
        break;

    case "create_table":
        $conn->select_db($dbname);
        $result = $conn->query("SHOW TABLES LIKE 'book_records'");
        if ($result->num_rows > 0) {
            $message = "Table 'book_records' already exists.";
        } else {
            $sql = "CREATE TABLE book_records (
                Book_Library_No INT PRIMARY KEY,
                Book_Name VARCHAR(255),
                Author_Name VARCHAR(255),
                Book_Edition VARCHAR(100),
                Price DECIMAL(10,2)
            )";
            if ($conn->query($sql) === TRUE) {
                $message = "✅ Table 'book_records' created successfully.";
            } else {
                $message = "Error creating table: " . $conn->error;
            }
        }
        break;

    case "delete_table":
        $conn->select_db($dbname);
        $result = $conn->query("SHOW TABLES LIKE 'book_records'");
        if ($result->num_rows == 0) {
            $message = "ℹ️ Table 'book_records' does not exist.";
        } else {
            $sql = "DROP TABLE book_records";
            if ($conn->query($sql) === TRUE) {
                $message = "✅ Table 'book_records' deleted successfully.";
            } else {
                $message = "Error deleting table: " . $conn->error;
            }
        }
        break;
}

}

$conn->close();
?>

<!DOCTYPE html>
<html>
<head>
    <title>Library SQL Panel</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
            background: #f5f5f5;
        }
        h2 {
            color: #333;
        }
        form {
            margin-top: 20px;
        }
        button {
            padding: 10px 20px;
            margin: 8px;
            background-color: #007BFF;
            border: none;
            color: white;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
        }
        button:hover {
            background-color: #0056b3;
        }
        .message {
            background-color: #e9f0ff;
            color: #003366;
            padding: 12px;
            margin: 15px 0;
            border-radius: 5px;
            font-size: 16px;
            border-left: 5px solid #007BFF;
        }
    </style>
</head>
<body>
    <h2>📚 Library SQL Operations</h2>

    <?php if ($message): ?>
        <div class="message">
            <?php echo $message; ?>
        </div>
    <?php endif; ?>

    <form method="post">
        <button type="submit" name="action" value="create_db">Create Database</button>
        <button type="submit" name="action" value="delete_db">Delete Database</button>
        <button type="submit" name="action" value="create_table">Create Table</button>
        <button type="submit" name="action" value="delete_table">Delete Table</button>
    </form>
</body>
</html>
