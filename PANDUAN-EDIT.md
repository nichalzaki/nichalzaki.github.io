# Panduan mengedit situs nichalzaki.github.io

Situs ini dibangun dengan Jekyll, yang sudah tersedia di GitHub Pages, sehingga tidak ada yang perlu dipasang di komputer. Isi situs disimpan terpisah dari desainnya. Teks beranda ada di `_data/home.yml`, data diri dan kontak di `_data/settings.yml`, dan setiap karya berupa satu file di folder `_works/`. Semua file itu bisa diubah lewat panel Pages CMS. Setiap kali Anda menyimpan perubahan, GitHub membangun ulang situsnya dalam satu sampai dua menit.

## Membuka panel admin (sekali saja)

1. Buka [app.pagescms.org](https://app.pagescms.org) dan masuk dengan akun GitHub.
2. Pasang (install) GitHub App Pages CMS pada akun Anda. Saat diminta memilih repositori, pilih `nichalzaki.github.io`.
3. Buka repositori itu dari dasbor Pages CMS. Menu di sisi kiri akan berisi **Karya**, **Isi beranda**, **Pengaturan situs**, dan **Media**, sesuai pengaturan di file `.pages.yml`.

Setelah langkah ini, Anda cukup membuka app.pagescms.org untuk mengedit lagi.

## Menambah karya

Buka **Karya**, lalu klik **Add an entry**. Yang wajib diisi hanya judul dan tahun. Kolom lain (penulis, genre, peran, ukuran buku, jumlah halaman, dan cerita proyek) boleh dikosongkan, dan baris yang kosong tidak akan muncul di halaman karya.

Gambar cover juga tidak wajib. Kalau kolomnya kosong, situs otomatis membuat cover tipografis dari judul dan nama penulis. Begitu Anda punya mockup cover yang bagus, unggah lewat kolom **Gambar cover**, dan tampilannya langsung berganti tanpa perlu mengubah apa pun. Halaman isi atau spread bisa dimasukkan ke **Galeri**, maksimal 12 gambar.

Matikan **Tampilkan di situs** kalau sebuah karya masih ingin disimpan sebagai draf. Selama belum ada satu pun karya yang tampil, bagian Work beserta menunya otomatis disembunyikan dari beranda. Beranda menampilkan delapan karya terbaru menurut tahun. Kalau jumlahnya lebih dari delapan, muncul tautan ke halaman `/work/` yang memuat semua karya.

## Mengubah isi beranda

**Isi beranda** memuat judul besar, angka-angka, layanan, paket harga, alur kerja, testimoni, teks tentang saya, FAQ, dan teks kontak. Bagian yang daftarnya dikosongkan, misalnya semua paket harga dihapus, otomatis hilang dari halaman, dan nomor bagian lainnya ikut menyesuaikan.

Di judul besar dan judul kontak, kata yang diapit tanda bintang, misalnya `*properly.*`, diberi stabilo warna aksen. Tekan Enter untuk membuat baris baru.

## Kontak dan warna aksen

**Pengaturan situs** memuat nama, e-mail, nomor WhatsApp, tautan Fiverr, dan deskripsi untuk Google. Nomor WhatsApp ditulis dengan format 62…, tanpa tanda + dan tanpa spasi. Kalau kolom WhatsApp atau Fiverr dikosongkan, tombolnya ikut hilang. Warna aksen bisa diganti antara hijau neon dan biru neon dari menu yang sama.

## Kalau ingin mengubah tampilan

Warna, jenis huruf, dan lebar halaman diatur di bagian atas file `assets/css/site.css`, pada blok `:root`. File ini bisa diedit langsung di github.com dengan mengklik ikon pensil. Struktur halaman ada di folder `_layouts/` dan di file `index.html`. Bagian ini sebaiknya tidak diubah kecuali memang ingin mengganti tata letaknya.

## Kalau perubahan tidak muncul

Buka tab **Actions** di repositori GitHub. Proses dengan tanda centang hijau berarti situs sudah diperbarui, dan Anda cukup memuat ulang halaman dengan Cmd+Shift+R. Tanda silang merah biasanya muncul karena salah ketik di file YAML, misalnya tanda titik dua di dalam teks yang tidak diberi tanda kutip. Klik prosesnya untuk melihat baris yang bermasalah.

File situs lama disimpan di folder `_archive/` dan tidak ikut tampil di situs.
