document.addEventListener('DOMContentLoaded', function () {
	tampilkanBuku();
});

function tambahBuku() {
	var title = document.getElementById('judul').value;
	var author = document.getElementById('penulis').value;
	var year = parseInt(document.getElementById('tahun').value);
	var status = document.getElementById('status').value;

	if (title === '' || author === '' || year === '') {
		alert('Semua kolom harus diisi!');
		return;
	}

	// generate id
	var id = Date.now().toString();

	var isComplete = status === 'sudahSelesai';

	var bukuBaru = {
		id: id,
		title: title,
		author: author,
		year: year,
		isComplete: isComplete,
	};

	var rakKey = isComplete ? 'sudahSelesaiList' : 'belumSelesaiList';

	var rakBuku = JSON.parse(localStorage.getItem(rakKey)) || [];
	rakBuku.push(bukuBaru);
	localStorage.setItem(rakKey, JSON.stringify(rakBuku));

	tampilkanBuku();
}

function tampilkanBuku() {
	tampilkanRak('belumSelesaiList');
	tampilkanRak('sudahSelesaiList');
}

function tampilkanRak(rakKey) {
	var rakBuku = JSON.parse(localStorage.getItem(rakKey)) || [];
	var rakList = document.getElementById(rakKey);
	rakList.innerHTML = '';

	for (var i = 0; i < rakBuku.length; i++) {
		var buku = rakBuku[i];

		var li = document.createElement('li');

		var judulSpan = document.createElement('h6');
		judulSpan.textContent = 'Judul: ' + buku.title;
		li.appendChild(judulSpan);
		var idSpan = document.createElement('p');
		idSpan.textContent = 'ID: ' + buku.id;
		li.appendChild(idSpan);
		var penulisSpan = document.createElement('p');
		penulisSpan.textContent = 'Penulis: ' + buku.author;
		li.appendChild(penulisSpan);

		var tahunSpan = document.createElement('p');
		tahunSpan.textContent = 'Tahun Terbit: ' + buku.year;
		li.appendChild(tahunSpan);

		if (rakKey === 'belumSelesaiList' || rakKey === 'sudahSelesaiList') {
			var buttonPindah = document.createElement('button');
			buttonPindah.textContent =
				'Pindah ke ' +
				(rakKey === 'belumSelesaiList' ? 'Sudah Selesai' : 'Belum Selesai');
			buttonPindah.onclick = function () {
				pindahBuku(buku, rakKey);
			};
			li.appendChild(buttonPindah);
		}

		var buttonHapus = document.createElement('button');
		buttonHapus.textContent = 'Hapus';
		buttonHapus.onclick = function () {
			hapusBuku(buku, rakKey);
		};
		li.appendChild(buttonHapus);

		rakList.appendChild(li);
	}
}

function pindahBuku(buku, dariRak) {
	var keRak =
		dariRak === 'belumSelesaiList' ? 'sudahSelesaiList' : 'belumSelesaiList';
	var rakBukuDari = JSON.parse(localStorage.getItem(dariRak)) || [];
	var rakBukuKe = JSON.parse(localStorage.getItem(keRak)) || [];

	var indexBuku = rakBukuDari.findIndex(function (item) {
		return item.title === buku.title && item.isComplete === buku.isComplete;
	});

	if (indexBuku !== -1) {
		var bukuPindah = rakBukuDari.splice(indexBuku, 1)[0];
		rakBukuKe.push(bukuPindah);

		localStorage.setItem(dariRak, JSON.stringify(rakBukuDari));
		localStorage.setItem(keRak, JSON.stringify(rakBukuKe));

		tampilkanBuku();
	}
}

function hapusBuku(buku, rakKey) {
	var rakBuku = JSON.parse(localStorage.getItem(rakKey)) || [];

	var indexBuku = rakBuku.findIndex(function (item) {
		return item.title === buku.title && item.isComplete === buku.isComplete;
	});

	if (indexBuku !== -1) {
		rakBuku.splice(indexBuku, 1);
		localStorage.setItem(rakKey, JSON.stringify(rakBuku));

		tampilkanBuku();
	}
}
