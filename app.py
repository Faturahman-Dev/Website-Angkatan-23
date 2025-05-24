import os
from flask import Flask, render_template, request, redirect, url_for, flash
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.secret_key = 'secretkey123'  


UPLOAD_FOLDER = 'static/uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def index():
    categories = [
        {'id': 'wisuda', 'name': 'Wisuda', 'cover': 'graduation.jpg'},
        {'id': 'study-tour', 'name': 'Study Tour', 'cover': 'study-tour.jpg'},
        {'id': 'acara', 'name': 'Acara Tahunan', 'cover': 'event.jpg'},
        {'id': 'olahraga', 'name': 'Competisi Olahraga', 'cover': 'sport.jpg'},
        {'id': 'kelas', 'name': 'Kelas', 'cover': 'classroom.jpg'},
        {'id': 'kemah', 'name': 'Kemah Bersama', 'cover': 'camping.jpg'}
    ]
    return render_template('index.html', categories=categories)

@app.route('/gallery/<category>')
def gallery(category):
    # Dapatkan daftar foto dari kategori tertentu (simulasi)
    # Dalam implementasi nyata, ini harus query database
    photos = []
    for i in range(1, 16):
        photos.append({
            'url': f'https://source.unsplash.com/random/600x600/?{category},{i}',
            'title': f'Foto {i}',
            'desc': f'Deskripsi foto {i} untuk kategori {category}'
        })
    return render_template('gallery.html', category=category.capitalize(), photos=photos)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        flash('Tidak ada file yang dipilih')
        return redirect(url_for('index'))
    
    files = request.files.getlist('file')
    photo_name = request.form.get('photoName', '')
    
    for file in files:
        if file.filename == '':
            continue
            
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            # Di sini bisa menyimpan info ke database
            # photo = Photo(name=photo_name, filename=filename, category=...)
            # db.session.add(photo)
            # db.session.commit()
    
    flash('Foto berhasil diupload!')
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)