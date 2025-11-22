# ☁️ Cloud Resume Challenge — Saket Gupta

This is my implementation of the **Cloud Resume Challenge**, building a cloud-hosted resume website using React and AWS (S3, CloudWatch, etc.).

---

## 🚀 Features

- Static React-based resume site  
- Visitor counter via AWS CloudWatch logs or a simple API  
- Hosted on **AWS S3**  
- Simple CI/CD pipeline for automatic deployments  

---

## 🛠️ Tech Stack

- **Frontend**: React.js  
- **Hosting**: AWS S3  
- **Logging / Analytics**: AWS CloudWatch  
- **CI/CD**: GitHub Actions (or relevant pipeline)  

---

## ▶️ How to View

1. Clone the repo:  
   ```bash
   git clone https://github.com/saketg0210/cloud-resume-free.git
  cd cloud-resume-free
  npm install  
  npm start  
  The site will run on http://localhost:3000 (or your chosen port).

## ▶️ Project Strucure

  cloud-resume-free/
├── public/  
│   └── index.html  
├── src/  
│   ├── components/  
│   ├── App.js  
│   └── index.js  
├── .github/workflows/   # CI/CD pipeline (if present)  
└── README.md  
