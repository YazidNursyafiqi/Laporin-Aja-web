import admin from "firebase-admin";
import "dotenv/config";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Firebase Admin
if (!admin.apps.length) {
    const key = JSON.parse(process.env.FIREBASE_PRIVATE_KEY);
    admin.initializeApp({
        credential: admin.credential.cert(key)
    });
}

const db = admin.firestore();

// Load province data
const provincePath = path.join(__dirname, "../../LaporinAja/src/component/province.json");
const provincesData = JSON.parse(fs.readFileSync(provincePath, "utf-8"));

// 25 Realistic Indonesian Usernames
const usernames = [
    "budi_santoso", "rizky_pratama", "dewi_lestari", "siti_rahma", "agus_setiawan",
    "hendra_kurniawan", "rina_puspita", "andri_wijaya", "rudi_hermawan", "tri_nugroho",
    "dian_sastro", "fajar_ramadhan", "maya_indriani", "suryadi_putra", "wawan_kristianto",
    "bayu_firmansyah", "ekowati_dewi", "guntur_pamungkas", "hadi_suwito", "indah_permata",
    "joko_widodo", "kartika_sari", "lukman_hakim", "mira_lesmana", "nugroho_prasetyo"
];

// Problem Categories
const categories = [
    "Infrastruktur dan Fasilitas",
    "Kebersihan dan Lingkungan",
    "Keamanan dan Ketertiban",
    "Pelayanan Publik dan aparatur",
    "Tindakan Korupsi",
    "Sosial dan Kemasyarakatan",
    "Kesehatan",
    "Lalu Lintas dan Transportasi",
    "Perizinan dan Usaha",
    "Lainnya"
];

// Realistic images mapping by category
const categoryImages = {
    "Infrastruktur dan Fasilitas": [
        "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=800&q=80"
    ],
    "Kebersihan dan Lingkungan": [
        "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1611284446314-60a55ac7de9f?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=800&q=80"
    ],
    "Keamanan dan Ketertiban": [
        "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80"
    ],
    "Pelayanan Publik dan aparatur": [
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
    ],
    "Tindakan Korupsi": [
        "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
    ],
    "Sosial dan Kemasyarakatan": [
        "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=800&q=80"
    ],
    "Kesehatan": [
        "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80"
    ],
    "Lalu Lintas dan Transportasi": [
        "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80"
    ],
    "Perizinan dan Usaha": [
        "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80"
    ],
    "Lainnya": [
        "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80"
    ]
};

// Report detail templates by category
const reportTemplates = {
    "Infrastruktur dan Fasilitas": [
        "Jalan berlubang cukup dalam dan berbahaya di jalur utama kendaraan. Mohon penanganan dari Dinas Perbaikan Jalan secepatnya sebelum menimbulkan korban jiwa.",
        "Lampu penerangan jalan umum (PJU) padam sudah lebih dari 2 minggu. Lokasi sangat gelap saat malam hari dan rawan kejahatan.",
        "Jembatan penyeberangan kondisinya mengkhawatirkan dengan pondasi yang sudah retak parah. Mohon segera dicek kelayakannya.",
        "Trotoar rusak berat dan tertutup material bangunan, membuat pejalan kaki terpaksa berjalan di badan jalan utama."
    ],
    "Kebersihan dan Lingkungan": [
        "Tumpukan sampah liar menumpuk di pinggir jalan dan menimbulkan bau tidak sedap. Belum ada pengangkutan dari dinas terkait selama beberapa hari.",
        "Saluran drainase tersumbat sampah dan endapan lumpur padat, mengakibatkan genangan air cukup tinggi saat hujan deras tiba.",
        "Pengolahan limbah pabrik/usaha diduga membuang sisa cairan ke sungai warga setempat sehingga air sungai berbau mencengat."
    ],
    "Keamanan dan Ketertiban": [
        "Marak aksi balap liar kendaraan berpotensi membahayakan warga saat dini hari. Mohon patroli rutin dari kepolisian di area ini.",
        "Penerangan jalan minim menyebabkan area sekitar gang pemukiman warga menjadi rawan pemalakan dan tindak kriminalitas."
    ],
    "Pelayanan Publik dan aparatur": [
        "Antrean pengurusan dokumen di kantor dinas sangat lambat akibat loket pelayanan yang dibuka hanya 1 dari 4 loket yang tersedia.",
        "Oknum petugas pelayanan diduga meminta biaya tambahan di luar tarif resmi administrasi untuk mempercepat pembuatan surat perizinan."
    ],
    "Tindakan Korupsi": [
        "Dugaan penyalahgunaan dana bantuan sosial pemukiman warga di mana penyaluran tidak sesuai nominal baku yang dijanjikan."
    ],
    "Sosial dan Kemasyarakatan": [
        "Bantuan logistik penanggulangan dampak banjir belum merata di beberapa RT. Mohon pendataan ulang penerima manfaat."
    ],
    "Kesehatan": [
        "Antrean fasilitas kesehatan di Puskesmas sangat padat dan dokter jaga sering datang tidak sesuai jadwal jam pelayanan.",
        "Stok obat dasar untuk penyakit flu dan batuk gratis di fasilitas pelayanan kesehatan masyarakat sering kosong."
    ],
    "Lalu Lintas dan Transportasi": [
        "Lampu lalu lintas di persimpangan utama padam sehingga memicu kemacetan parah dan potensi kecelakaan beruntun.",
        "Banyak kendaraan parkir liar di bahu jalan raya yang mempersempit ruas jalur jalan utama."
    ],
    "Perizinan dan Usaha": [
        "Pengurusan izin usaha mikro terhambat oleh persyaratan berkas yang berbelit-belit dan prosedur yang tidak transparan."
    ],
    "Lainnya": [
        "Fasilitas umum taman kota tidak terawat dengan baik, banyak tempat duduk dan wahana bermain anak yang rusak parah."
    ]
};

// Perpetrators sample
const perpetratorSamples = [
    { "Dinas Pekerjaan Umum": "Penanggung Jawab Kontraktor" },
    { "Pengelola Sampah Wilayah": "Petugas Kebersihan" },
    { "Oknum Petugas Loket": "Penyelenggara Layanan" },
    { "Kontraktor Pelaksana": "Pelaksana Proyek" },
    { "Dinas Perhubungan": "Pengawas Lalu Lintas" },
    { "Pihak Pengembang": "Pemilik Lahan" }
];

async function seedData() {
    console.log("🚀 Starting insertion of 300 reports across all 38 provinces in Indonesia...");

    // 1. Create or ensure 25 User Accounts exist
    console.log("👤 Creating user accounts...");
    const userPostMap = {};
    for (const uname of usernames) {
        userPostMap[uname] = [];
        const snapshot = await db.collection("accounts").where("username", "==", uname).limit(1).get();
        if (snapshot.empty) {
            await db.collection("accounts").add({
                username: uname,
                password: "password123",
                created_at: Date.now(),
                posts: []
            });
        }
    }
    console.log("✅ 25 Accounts ready!");

    // 2. Prepare Region Stats Object
    const regionStats = {};
    provincesData.forEach(p => {
        regionStats[p.province] = {
            total: 0,
            type: {}
        };
        categories.forEach(c => {
            regionStats[p.province].type[c] = 0;
        });
    });

    const now = Date.now();
    const reportsToInsert = [];

    // Generate exactly 300 reports distributed across 38 provinces
    let reportCount = 0;
    const totalTarget = 300;

    while (reportCount < totalTarget) {
        for (const provObj of provincesData) {
            if (reportCount >= totalTarget) break;

            const province = provObj.province;
            const regencies = provObj.regency;
            const regency = regencies[Math.floor(Math.random() * regencies.length)];
            const category = categories[Math.floor(Math.random() * categories.length)];
            const username = usernames[Math.floor(Math.random() * usernames.length)];
            
            // Random image (85% has image, 15% no image)
            const hasImg = Math.random() > 0.15;
            const imgList = categoryImages[category] || categoryImages["Infrastruktur dan Fasilitas"];
            const imagePath = hasImg ? imgList[Math.floor(Math.random() * imgList.length)] : "no-image";

            // Random description
            const descTemplates = reportTemplates[category] || reportTemplates["Infrastruktur dan Fasilitas"];
            const descBase = descTemplates[Math.floor(Math.random() * descTemplates.length)];
            const penjelasan = `[Laporan Warga di ${regency}, ${province}]\n\n${descBase}\n\nLokasi rinci: Sekitar area ${regency}. Mohon ditindaklanjuti demi kenyamanan bersama.`;

            // Random perpetrator
            const yangTerkait = perpetratorSamples[Math.floor(Math.random() * perpetratorSamples.length)];

            // Random date (spread over last 60 days)
            const randomDaysAgo = Math.floor(Math.random() * 60);
            const reportDate = now - (randomDaysAgo * 86400000) - Math.floor(Math.random() * 3600000);
            const reportId = `${reportDate}${Math.floor(10000 + Math.random() * 90000)}`;

            const reportDoc = {
                id: reportId,
                kirim_sebagai: username,
                jenis_pengaduan: category,
                provinsi: province,
                kabupaten: regency,
                penjelasan: penjelasan,
                kondisi_saat_ini: Math.random() > 0.3 ? "Belum-terselesaikan" : "Tidak-Diselesaikan",
                yang_terdampak: Math.random() > 0.5 ? "Semua-Masyarakat" : "saya-sendiri",
                imagePath: imagePath,
                yang_terkait: yangTerkait,
                date: reportDate,
                comments: [],
                likes: Math.floor(Math.random() * 65)
            };

            reportsToInsert.push(reportDoc);
            userPostMap[username].push(reportId);

            // Update local region stats
            regionStats[province].total += 1;
            regionStats[province].type[category] = (regionStats[province].type[category] || 0) + 1;

            reportCount++;
        }
    }

    console.log(`📝 Prepared ${reportsToInsert.length} report documents.`);

    // 3. Batch Insert Reports into Firestore
    console.log("📦 Writing reports to Firestore in batches...");
    const batchSize = 100;
    for (let i = 0; i < reportsToInsert.length; i += batchSize) {
        const batch = db.batch();
        const chunk = reportsToInsert.slice(i, i + batchSize);
        
        chunk.forEach(report => {
            const docRef = db.collection("reports").doc();
            batch.set(docRef, report);
        });

        await batch.commit();
        console.log(`  ✓ Inserted ${Math.min(i + batchSize, reportsToInsert.length)} / ${reportsToInsert.length} reports`);
    }

    // 4. Update user account post arrays in Firestore
    console.log("🔄 Updating user account post lists...");
    for (const uname of usernames) {
        const snapshot = await db.collection("accounts").where("username", "==", uname).limit(1).get();
        if (!snapshot.empty) {
            const postIds = userPostMap[uname];
            if (postIds.length > 0) {
                await snapshot.docs[0].ref.update({
                    posts: admin.firestore.FieldValue.arrayUnion(...postIds)
                });
            }
        }
    }

    // 5. Update Region document ('general') in Firestore
    console.log("🗺️ Updating region statistics document ('general')...");
    const regionDocRef = db.collection("regions").doc("general");
    const regionSnapshot = await regionDocRef.get();
    let currentRegionData = regionSnapshot.exists ? regionSnapshot.data() : {};

    // Merge new counts with existing region document
    Object.keys(regionStats).forEach(prov => {
        if (!currentRegionData[prov]) {
            currentRegionData[prov] = { total: 0, type: {} };
        }
        currentRegionData[prov].total = (currentRegionData[prov].total || 0) + regionStats[prov].total;
        
        if (!currentRegionData[prov].type) {
            currentRegionData[prov].type = {};
        }

        Object.keys(regionStats[prov].type).forEach(cat => {
            currentRegionData[prov].type[cat] = (currentRegionData[prov].type[cat] || 0) + regionStats[prov].type[cat];
        });
    });

    await regionDocRef.set(currentRegionData, { merge: true });
    console.log("✅ Region statistics updated successfully!");

    console.log("\n🎉 SUCCESS! 300 reports across all 38 provinces in Indonesia inserted cleanly into Firestore!");
}

seedData().then(() => {
    process.exit(0);
}).catch(err => {
    console.error("❌ Seeding Error:", err);
    process.exit(1);
});
