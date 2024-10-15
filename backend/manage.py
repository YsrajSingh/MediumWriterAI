from models import engine, Base
from sqlalchemy import inspect, MetaData
from sqlalchemy.exc import OperationalError
from sqlalchemy.sql import text

def create_tables():
    Base.metadata.create_all(engine)
    print("Tables created successfully.")

def drop_tables():
    Base.metadata.drop_all(engine)
    print("Tables dropped successfully.")

def update_schema():
    """ Update the database schema to match the current models. """
    inspector = inspect(engine)  # Inspect the current database schema
    metadata = MetaData()
    metadata.reflect(bind=engine)  # Reflect the existing database schema

    with engine.connect() as connection:
        for table in Base.metadata.sorted_tables:
            # Check if the table exists in the database
            if not inspector.has_table(table.name):
                print(f"Table '{table.name}' not found in database. Creating it.")
                table.create(engine)
            else:
                # Check for missing columns and add them if necessary
                existing_columns = [col['name'] for col in inspector.get_columns(table.name)]
                for column in table.columns:
                    if column.name not in existing_columns:
                        try:
                            print(f"Adding missing column '{column.name}' to table '{table.name}'.")
                            # Generate an ALTER TABLE statement to add the column
                            connection.execute(
                                text(f'ALTER TABLE "{table.name}" ADD COLUMN {column.name} {column.type.compile(engine.dialect)}')
                            )
                            print(f"Column '{column.name}' added successfully.")
                        except OperationalError as e:
                            print(f"Error adding column '{column.name}': {e}")
                    else:
                        print(f"Column '{column.name}' already exists in table '{table.name}'.")

                # Check for columns that need to be altered
                for column in table.columns:
                    if column.name in existing_columns:
                        # Fetch current column type
                        current_type = [col['type'] for col in inspector.get_columns(table.name) if col['name'] == column.name][0]
                        # Compare with the desired type
                        if str(column.type) != str(current_type):
                            try:
                                print(f"Altering column '{column.name}' to type '{column.type}' in table '{table.name}'.")
                                # Generate an ALTER TABLE statement to modify the column type
                                connection.execute(
                                    text(f'ALTER TABLE "{table.name}" ALTER COLUMN {column.name} TYPE {column.type.compile(engine.dialect)}')
                                )
                                print(f"Column '{column.name}' altered successfully.")
                            except OperationalError as e:
                                print(f"Error altering column '{column.name}': {e}")

    print("Schema update completed successfully.")

if __name__ == "__main__":
    import sys
    if len(sys.argv) < 2:
        print("Usage: manage.py [migrate|reset|update]")
        sys.exit(1)

    command = sys.argv[1]

    if command == "migrate":
        create_tables()
    elif command == "reset":
        drop_tables()
    elif command == "update":
        update_schema()
    else:
        print("Unknown command. Use 'migrate', 'reset', or 'update'.")
