# Medium Writer AI

This project automates content creation for Medium using AI. Users provide a CSV with titles, keywords, and target audiences. The AI generates engaging articles, which are refined for quality and SEO. The Medium API automates posting, allowing for daily articles. Analytics track performance, enabling ongoing content strategy improvements.


---

# 🔔 Important Announcement! 🔔

**🚨 Attention: The app is currently under development and not yet available for use. Please stay tuned for updates!** 

**👉 [Learn More Here](#)**

---



## Project Structure

```
/mediumwriterai
├── /frontend                # Next.js app
│   ├── /app
│   ├── /docker/Dockerfile
│   ├── package.json
│   └── ...other config files
├── /backend                 # FastAPI app
│   ├── /schemas
│   ├── /docker/Dockerfile
│   ├── main.py
│   ├── requirements.txt
│   └── ...other config files
├── docker-compose.yml       # Docker Compose file
└── README.md
```

## Technologies Used
- **Frontend** : Next.js
- **Backend** : FastAPI
- **Containerization** : Docker
- **Development** : Docker Volumes for live reloading


## Getting Started

### Prerequisites
- Install [Docker](https://docs.docker.com/get-started/get-docker/)
- Install [Docker Compose](https://docs.docker.com/compose/install/)


### Setup Instructions
- **Clone the Repository**:
    ```
    git clone https://github.com/YsrajSingh/nextjs-fastapi-docker.git
    cd nextjs-fastapi-docker
    ```

- **Build and Run the Application**: Use Docker Compose to build and run the containers.
    ```
    docker-compose up -d --build
    ```

### Accessing the Applications
- **Frontend**: Open your browser and go to [http://localhost:3000](http://localhost:3000).
- **Backend**: Open your browser and go to [http://localhost:8000](http://localhost:8000).


### Directory Overview
- **frontend/**: Contains the Next.js application.

    - **Dockerfile**: Defines the Docker image for the Next.js frontend.
    - **package.json**: Manages frontend dependencies.

- **backend/**: Contains the FastAPI application.

    - **Dockerfile**: Defines the Docker image for the FastAPI backend.
    - **main.py**: The main FastAPI application file.
    - **requirements.txt**: Lists the Python dependencies.


### Commands to Run
- **Build and Start**:
    ```
    docker-compose up -d --build
    ```

- Stop the Containers:
    ```
    docker-compose down
    ```

### Additional Information
- For more details about Next.js, visit [Next.js Documentation](https://nextjs.org/docs).
- For more details about FastAPI, visit [FastAPI Documentation](https://fastapi.tiangolo.com/).

## Contributing
Contributions are welcome! Feel free to open issues or submit pull requests.

## License
This project is licensed under the MIT License. See the [LICENSE](https://github.com/YsrajSingh/MediumWriterAI/blob/main/LICENSE) file for details.


## Acknowledgments
This project demonstrates a basic setup of Next.js and FastAPI using Docker, showcasing how to work with modern web technologies.