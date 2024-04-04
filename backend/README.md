# Green-Grub Backend./

This is a Django project to run as the backend for GreenGrub - a community built project to improve awareness of food sustainability.

Follow the instructions below to set up and run the project locally on your machine.

## Prerequisites

Before you begin, ensure you have met the following requirements:
* You have installed Python 3.8 or later.
* You have `pip` installed.

## Setting Up the Project

To set up the project, follow these steps:

### Create a Virtual Environment

Create a new virtual environment for the project. This will keep your dependencies separate from other projects.

```bash
python -m venv venv
```

### Activate the Virtual Environment

Activate the virtual environment. The command depends on your operating system.

**On Windows:**

```bash
.\venv\Scripts\activate
```

**On macOS and Linux:**

```bash
source venv/bin/activate
```

### Install Dependencies

With the virtual environment activated, install the project dependencies:

```bash
pip install -r requirements.txt
```

### Database Migrations

Make all necessary database migrations with the following commands:

```bash
python manage.py makemigrations
python manage.py migrate
```

### Seed the Database

Seed the database with quizzes and questions. You can do this by running the following command:

```bash
python manage.py seed
```

Ensure that the `seed` command is implemented in your Django management commands.

### Running the Server

Finally, start the Django development server:

```bash
python manage.py runserver
```

The server should start on the default port `8000`. Access the application by navigating to `http://127.0.0.1:8000/` in your web browser.

## Usage
** insert notion link **
## Contributing to Green-Grub Backend

If you wish to contribute to this project, or learn more please contact any of the original contributors (Adel, Henrick, Isha, Razeen)

## License
Give credits if you are going to use the code. :)