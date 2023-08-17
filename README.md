# Frame

## Description

This is a full-stack web application that allows users to view and interact with a gallery of artwork images. The application is built using the MERN stack (MongoDB, Express.js, React, and Node.js), and images are stored in Amazon S3. The application also features real-time updates using Socket.io.

![Screenshot of the application](screenshot.png)

## Features

-   **Responsive Gallery Layout**:
    -   Displays images in a grid that reflows responsively to fit any viewport.
-   **Zoom Functionality**:
    -   Users can zoom in and out of images using buttons.
-   **Image Upload Interface**:
    -   Admins can batch upload images through a simple and intuitive UI.
-   **Real-time Updates**:
    -   Uses Socket.io to report the upload status in real time.
-   **Admin Panel**:
    -   Allows admins to view and delete images.
-   **Duplicate Check**:
    -   Checks for duplicate files based on filename and date before uploading.

## Prerequisites

-   Node.js
-   MongoDB
-   Amazon S3 Account

## Installation

1. **Clone the Repository**

    ```sh
    git clone https://github.com/yourusername/art-gallery-application.git
    cd art-gallery-application
    ```

2. **Install Server Dependencies**

    ```sh
    cd server
    npm install
    ```

3. **Install Client Dependencies**

    ```sh
    cd client
    npm install
    ```

4. **Set Up Environment Variables**

    - Create a `.env` file in the `server` directory and add the following:

    ```env
    MONGO_URI=<Your MongoDB Atlas Connection String>
    PORT=3001
    AWS_ACCESS_KEY=your_aws_access_key
    AWS_SECRET_KEY=your_aws_secret_key
    AWS_REGION=your_aws_region
    AWS_S3_BUCKET=your_s3_bucket_name
    ```

5. **Start the Development Server**

    - From the `server` directory:

    ```sh
    npm run dev
    ```

    - From the `client` directory:

    ```sh
    npm start
    ```

## Usage

-   Open your browser and navigate to `http://localhost:3000` to view the gallery.
-   Navigate to `http://localhost:3000/admin` to access the admin panel (for demonstration purposes; in a real-world application, you would secure this with authentication).

## Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Your Name - your.email@example.com

Project Link: [https://github.com/yourusername/art-gallery-application](https://github.com/yourusername/art-gallery-application)
