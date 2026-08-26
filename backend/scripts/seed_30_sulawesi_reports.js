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

// Filter for 6 Sulawesi provinces
const sulawesiProvinces = provincesData.filter(p => 
    p.province.includes("Sulawesi") || p.province.includes("Gorontalo")
);

// Realistic Sulawesi Usernames
const usernames = [
    "daeng_ewako", "andi_maccini", "nurul_sulawesi", "i_made_sulawesi",
    "daeng_sulle", "raja_kaili", "arifin_manado", "tenri_olang",
    "la_ode_hasan", "wa_ode_siti", "rusli_gorontalo", "kurnia_mamuju"
];

// Categories
const categories = [
    "Infrastruktur dan Fasilitas",
    "Kebersihan dan Lingkungan",
    "Keamanan dan Ketertiban",
    "Pelayanan Publik dan aparatur",
    "Tindakan Korupsi",
    "Kesehatan",
    "Lalu Lintas dan Transportasi"
];

// Images mapping by category
const categoryImages = {
    "Infrastruktur dan Fasilitas": [
        "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=800&q=80"
    ],
    "Kebersihan dan Lingkungan": [
        "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1611284446314-60a55ac7de9f?auto=format&fit=crop&w=800&q=80"
    ],
    "Keamanan dan Ketertiban": [
        "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=800&q=80"
    ],
    "Pelayanan Publik dan aparatur": [
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
    ],
    "Tindakan Korupsi": [
        "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80"
    ],
    "Kesehatan": [
        "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80"
    ],
    "Lalu Lintas dan Transportasi": [
        "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80"
    ]
};

// Sulawesi-specific realistic problem texts
const sulawesiReportTemplates = [
    "Jalan poros utama penghubung antar kabupaten mengalami kerusakan parah akibat amblasan tanah setelah hujan deras. Kendaraan roda 4 harus bergiliran lewat.",
    "Tumpukan sampah pesisir pantai belum diangkut oleh armada dinas kebersihan setempat, memicu aroma tak sedap bagi warga dan wisatawan.",
    "Lampu PJU di sepanjang jalur protokol padam sejak seminggu lalu. Sangat rawan kecelakaan di malam hari.",
    "Antrean pendaftaran BPJS di rumah sakit daerah sangat menumpuk karena gangguan sistem jaringan loket pelayanan.",
    "Dugaan pungutan liar pada pengurusan dokumen sertifikat tanah di kantor dinas oleh oknum setempat.",
    "Pendangkalan drainase kota menyebabkan luapan air ke jalan raya setiap kali curah hujan tinggi.",
    "Kemacetan parah di persimpangan jalan akibat banyaknya kendaraan parkir liar di bahu jalan dekat kawasan pasar utama."
];

const perpetratorSamples = [
    { "Dinas Pekerjaan Umum Daerah": "Penanggung Jawab Kontraktor" },
    { "Dinas Kebersihan Wilayah": "Pengelola Sampah" },
    { "Oknum Petugas Loket": "Penyelenggara Layanan" },
    { "Dinas Perhubungan Daerah": "Pengawas Lalu Lintas" }
];

async function seedSulawesiData() {
    console.log("🚀 Starting insertion of 30 reports across Sulawesi provinces...");

    // 1. Create User Accounts
    console.log("👤 Ensuring Sulawesi user accounts...");
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

    // 2. Prepare Region Stats
    const regionStats = {};
    sulawesiProvinces.forEach(p => {
        regionStats[p.province] = { total: 0, type: {} };
    });

    const now = Date.now();
    const reportsToInsert = [];
    const targetCount = 30;

    let count = 0;
    while (count < targetCount) {
        for (const provObj of sulawesiProvinces) {
            if (count >= targetCount) break;

            const province = provObj.province;
            const regency = provObj.regency[Math.floor(Math.random() * provObj.regency.length)];
            const category = categories[Math.floor(Math.random() * categories.length)];
            const username = usernames[Math.floor(Math.random() * usernames.length)];
            
            const imgList = categoryImages[category] || categoryImages["Infrastruktur dan Fasilitas"];
            const imagePath = imgList[Math.floor(Math.random() * imgList.length)];
            const descBase = sulawesiReportTemplates[Math.floor(Math.random() * sulawesiReportTemplates.length)];

            const penjelasan = `[Laporan Warga Sulawesi di ${regency}, ${province}]\n\n${descBase}\n\nLokasi: Wilayah ${regency}. Mohon bantuan instansi terkait untuk penanganan segera demi kenyamanan masyarakat Sulawesi.`;
            const yangTerkait = perpetratorSamples[Math.floor(Math.random() * perpetratorSamples.length)];

            const randomDaysAgo = Math.floor(Math.random() * 30);
            const reportDate = now - (randomDaysAgo * 86400000) - Math.floor(Math.random() * 3600000);
            const reportId = `${reportDate}${Math.floor(10000 + Math.random() * 90000)}`;

            const reportDoc = {
                id: reportId,
                kirim_sebagai: username,
                jenis_pengaduan: category,
                provinsi: province,
                kabupaten: regency,
                penjelasan: penjelasan,
                kondisi_saat_ini: Math.random() > 0.4 ? "Belum-terselesaikan" : "Tidak-Diselesaikan",
                yang_terdampak: "Semua-Masyarakat",
                imagePath: imagePath,
                yang_terkait: yangTerkait,
                date: reportDate,
                comments: [],
                likes: Math.floor(Math.random() * 85) + 10
            };

            reportsToInsert.push(reportDoc);
            userPostMap[username].push(reportId);

            regionStats[province].total += 1;
            regionStats[province].type[category] = (regionStats[province].type[category] || 0) + 1;

            count++;
        }
    }

    console.log(`📝 Generated ${reportsToInsert.length} Sulawesi reports.`);

    // 3. Batch Insert Reports into Firestore
    console.log("📦 Writing Sulawesi reports to Firestore...");
    const batch = db.batch();
    reportsToInsert.forEach(report => {
        const docRef = db.collection("reports").doc();
        batch.set(docRef, report);
    });
    await batch.commit();
    console.log("✅ Reports written to Firestore successfully!");

    // 4. Update user account post arrays
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

    console.log("\n🎉 SUCCESS! 30 reports across all Sulawesi provinces inserted cleanly into Firestore!");
}

seedSulawesiData().then(() => {
    process.exit(0);
}).catch(err => {
    console.error("❌ Seeding Error:", err);
    process.exit(1);
});
