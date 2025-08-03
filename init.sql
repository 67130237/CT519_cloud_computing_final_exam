-- สร้างฐานข้อมูลถ้ายังไม่มี
CREATE DATABASE IF NOT EXISTS finalexam;
USE finalexam;

-- สร้างตาราง references (ใส่ backtick ครอบ เพราะเป็น reserved word)
CREATE TABLE IF NOT EXISTS `references` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title TEXT NOT NULL,
    pdf_path VARCHAR(255) NOT NULL
);

-- ใส่ mock data ตั้งต้น (เลือกใช้ ref1.pdf, ref2.pdf, ref3.pdf)
INSERT INTO `references` (title, pdf_path) VALUES
(
    'K. Mendez, B. Tran, and S. Umer, “LLM-based Event Log Analysis Techniques: A Survey,” 2024. [Online]. Available: https://arxiv.org/abs/2404.06547',
    'ref1.pdf'
),
(
    'R. Y. Ahmad, J. M. Hernandez, C. Wang, H. Zhang, and S. Kambhampati, “Agentic AI: Autonomous Intelligence for Complex Goals – A Comprehensive Survey,” 2024. [Online]. Available: https://arxiv.org/abs/2402.12896',
    'ref2.pdf'
),
(
    'C. Zhang, H. Cho, J. Zheng, and M. Srivatsa, “CAPRI-A: Context-Aware Privacy Framework for Multi-Agent Generative AI Applications,” in Proc. 2024 IEEE Symposium on Security and Privacy (SP), 2024, pp. 1–18.',
    'ref3.pdf'
);
