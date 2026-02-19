# HRMS Lite
HRMS Lite is a simple Human Resource Management System that allows managing employees and tracking attendance. The backend is built with FastAPI and the frontend with React.

## Link:
Start backend first-> https://hrms-ilnt.onrender.com/docs
Then -> https://hrms-five-mu.vercel.app/

## Features
1. Add, delete, and list employees
2. Mark and view attendance
3. Filter attendance records by date
4. Display total present days per employee
5. Basic dashboard summary 
6. Backend API built with FastAPI
7. Frontend built with React and Axios
8. PostgreSQL database support
9. CORS enabled for frontend-backend integration

## Tech Stack 
* Backend: FastAPI, SQLAlchemy, PostgreSQL, Uvicorn, Python-dotenv
* Frontend: React, Axios, JavaScript, HTML, CSS
* Deployment: Render (backend), Vercel (frontend)
* Backend deployed on : https://hrms-ilnt.onrender.com/docs --> to see API endpoints

## Project Structure
``` bash
HRMS/
├── backend/
│   ├── app/
│   │   ├── main.py          # FastAPI app entrypoint
│   │   ├── database.py      # Database setup
|   |   ├── models.py
|   |   ├── schemas.py
│   │   ├── routers/
│   │   │   ├── employees.py
│   │   │   └── attendance.py
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── hrmsApi.js       # Axios API calls
|   |   ├── App.js
|   |   ├── index.css
│   │   └── components/
|   |   |   ├── EmployeeForm.js
|   |   |   ├── EmployeeList.js
|   |   |   ├── AttendanceForm.js
|   |   |   ├── AttendanceList.js
|   |   |   ├── Attendance.js
|   |   |   ├── Employee.js
│   │   │   └── ConfirmModal.js   #box for yes or no for confiming delete
│   └── package.json
└── README.md
```

Backend .env:
```bash

DB_USER=your_db_username
DB_PASSWORD=your_db_password
DB_HOST=your_db_host
DB_PORT=5432
DB_NAME=hrms_lite
```
Frontend .env
```bash
REACT_APP_API_BASE=http://127.0.0.1:8000   # Local
REACT_APP_API_BASE=https://hrms-ilnt.onrender.com   # Production
```


## API Endpoints
### Employees
`GET /employees/` – List all employees

`POST /employees/` – Add a new employee

`DELETE /employees/{employee_id}` – Delete an employee

### Attendance

`GET /attendance/{employee_id}` – Get attendance for an employee

`POST /attendance/` – Mark attendance

## 🔧 Getting Started (Local Development)
### Backend
* After git clone:  
``` bash
cd backend
```
* Install dependencies:

``` bash
pip install -r requirements.txt
```
* Create a .env file in the backend folder with database credentials
```bash

DB_USER=your_db_username
DB_PASSWORD=your_db_password
DB_HOST=your_db_host
DB_PORT=5432
DB_NAME=hrms_lite
```

* Run the server:
```bash
python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

### The backend will be available at `http://127.0.0.1:8000`

### Frontend

* Go to the frontend folder:
```bash
cd frontend
```
* Create a .env file in the frontend folder
```bash
REACT_APP_API_BASE=http://127.0.0.1:8000 # for local testing
```
* Install dependencies:

```bash
npm install
```

Run the development server:
```bash
npm start
```

### The frontend will be available at `http://localhost:3000`

Finally the app view:
<img width="1565" height="863" alt="image" src="https://github.com/user-attachments/assets/8d89c4c4-f72f-4294-8907-c25fbd575c90" />



