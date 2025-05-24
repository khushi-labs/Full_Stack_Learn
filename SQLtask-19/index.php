<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "library";
$message = "";
$tableHTML = "";

$conn = new mysqli($servername, $username, $password);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$conn->select_db($dbname);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $action = $_POST['action'];

    switch ($action) {
        case "alter_table_add_column":
            $check = $conn->query("SHOW COLUMNS FROM book_records LIKE 'no_of_pages'");
            if ($check->num_rows > 0) {
                $message = "Column 'no_of_pages' already exists.";
            } else {
                $sql = "ALTER TABLE book_records ADD no_of_pages INT";
                if ($conn->query($sql) === TRUE) {
                    $message = "Column 'no_of_pages' added successfully.";
                } else {
                    $message = "Error adding column: " . $conn->error;
                }
            }
            break;

        case "add_primary_key":
            $check = $conn->query("SHOW INDEX FROM book_records WHERE Key_name = 'PRIMARY'");
            if ($check->num_rows > 0) {
                $message = "Primary key already exists.";
            } else {
                $sql = "ALTER TABLE book_records ADD PRIMARY KEY (Book_No)";
                if ($conn->query($sql) === TRUE) {
                    $message = "Primary key added to 'Book_Library_No'.";
                } else {
                    $message = "Error adding primary key: " . $conn->error;
                }
            }
            break;

        case "insert_data":
            $sql = "INSERT INTO book_records 
                    (Book_No, Book_Name, Author_Name, Book_Edition, Price, no_of_pages)
                    VALUES (1001, 'Mathematics', 'RD Sharma', '1st', 650.00, 464)";
            if ($conn->query($sql) === TRUE) {
                $message = "Sample data inserted successfully.";
            } else {
                $message = "Error inserting data: " . $conn->error;
            }
            break;
    }
}
$tableCheck = $conn->query("SHOW TABLES LIKE 'book_records'");
if ($tableCheck && $tableCheck->num_rows > 0) {
    $result = $conn->query("SELECT * FROM book_records");
    $fields = $conn->query("SHOW COLUMNS FROM book_records");

    if ($fields && $fields->num_rows > 0) {
        $tableHTML .= "<table border='1' cellpadding='8' cellspacing='0'>";
        $tableHTML .= "<tr>";
        while ($field = $fields->fetch_assoc()) {
            $tableHTML .= "<th>" . htmlspecialchars($field['Field']) . "</th>";
        }
        $tableHTML .= "</tr>";

        if ($result && $result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $tableHTML .= "<tr>";
                foreach ($row as $value) {
                    $tableHTML .= "<td>" . htmlspecialchars($value) . "</td>";
                }
                $tableHTML .= "</tr>";
            }
        } else {
            $tableHTML .= "<tr>";
            for ($i = 0; $i < $fields->num_rows; $i++) {
                $tableHTML .= "<td><em>—</em></td>";
            }
            $tableHTML .= "</tr>";
        }

        $tableHTML .= "</table>";
    }
} else {
    $tableHTML .= "<p><em>Table 'book_records' does not exist.</em></p>";
}


$conn->close();
?>

<!DOCTYPE html>
<html>
<head>
    <title>Task 19: Book Records Table Actions</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
            background: #f5f5f5;
        }
        h2 {
            color: #333;
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
        table {
            border-collapse: collapse;
            margin-top: 20px;
            background: white;
            width: 100%;
        }
        th, td {
            padding: 10px;
            border: 1px solid #ccc;
        }
        th {
            background: #007BFF;
            color: white;
        }
    </style>
</head>
<body>
    <h2>📘 Task 19: Book Records Table</h2>

    <?php if ($message): ?>
        <div class="message"><?php echo $message; ?></div>
    <?php endif; ?>

    <form method="post">
        <button type="submit" name="action" value="alter_table_add_column">Add 'no_of_pages' Column</button>
        <button type="submit" name="action" value="add_primary_key">Add Primary Key</button>
        <button type="submit" name="action" value="insert_data">Insert Sample Data</button>
    </form>

    <h3>📄 Table Preview</h3>
    <?php echo $tableHTML; ?>
</body>
</html>
