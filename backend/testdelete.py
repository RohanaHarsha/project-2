from flask_bcrypt import Bcrypt
from app import db, app  # make sure app and db are correctly imported from your project
from models import Admin,Agent

bcrypt = Bcrypt()

# --- STARTING APP CONTEXT ---
with app.app_context():
    # ✅ Choose which Admin to delete (by username or email)
    admin_email = 1  # change this to the admin you want to delete

    # ✅ Fetch the admin from the DB
    admin_to_delete =Agent.query.filter_by(email=admin_email).first()# Admin.query.filter_by(email=admin_email).first()

    if admin_to_delete:
        print(f"Admin Found: {admin_to_delete.email} — Deleting now...")
        db.session.delete(admin_to_delete)
        db.session.commit()
        print("Admin deleted successfully! ✅")
    else:
        print("Admin not found ❌")
