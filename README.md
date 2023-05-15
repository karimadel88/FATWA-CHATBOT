# FATWA-CHATBOT

This project is called [FATWA-CHATBOT], and it is a [graduation project designed by Al-Azhar University students, College of Science, department of computer science. The project was supervised by prof. Mohammed abd el-Azize abd el-Razik and developed by a team of students including:

## Creators

- Abd El-Rahman Hassan Mohamed Habiba 
- Ahmed Mansur Mohamed Fares
- Basel Obaid Sedek Khames
- Karim Adel Eid Abd-Elhalim
- Mohamed Ashref Sayed Mohamed
- Noor-El-din Kamel Noor-El-din Esmat

## Supervisor

- prof. Mohammed abd el-Azize abd el-Razik 

## Introduction
The chatbot is an innovative tool that combines the power of semantic search and artificial intelligence to provide accurate and relevant answers to queries related to Islamic law and jurisprudence. This chatbot uses advanced natural language processing techniques to understand and interpret user queries and then searches through a vast dataset of internal documents to customize its model and provide the most relevant answers.

## Installation

To install and run this project, follow the steps below:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/karimadel88/FATWA-CHATBOT.git
   ```

2. Install the necessary dependencies for the client:

   ```bash
   cd client/
   npm install
   ```

3. Install the necessary dependencies for the server:

   ```bash
   cd server/
   npm install
   ```

4. Install the necessary dependencies for the LLM server:

   ```bash
   cd server_LLM/
   pip install -r requirements.txt
   ```

5. Start the client:

   ```bash
   cd client/
   npm run start
   ```

6. Start the server:

   ```bash
   cd server/
   npm run dev
   ```

7. Start the LLM server:

   ```bash
   cd server_LLM/
   python3 mlserver.py
   ```

## Usage

To use the [FATWA-CHATBOT], follow the steps below:

1. Open a web browser and navigate to `http://localhost:5173`.
2. Enter your query in the search bar and press Enter.
3. Wait for the response from the AI-powered search engine.
4. View the response in the search results.
