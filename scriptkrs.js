// KRS sorgusunda dönebilecek tüm segment isimleri
const segmentList = [
    "GGOH", "GGOE", "GGSS", "GGS1", "GGS2", "GGS9",
    "GGCV", "GGAP", "GGCI", "GGBS", "GGVM", "GGVD",
    "GGTK", "GGCP", "GGNS", "GGAD", "GGAF", "GGPD",
    "GGMP", "GGBD"
];

// Parse tanımı olan segmentler
const segmentDefinitions = {
    "GGMP": [
        { name: "Segment Kimliği", start: 1, end: 4 },
        { name: "Segment Uzunluğu", start: 5, end: 8 },
        { name: "Segment Sırası", start: 9, end: 10 },
        { name: "Segment Versiyon Numarası", start: 11, end: 12 },
        { name: "Rezerve Alan", start: 13, end: 13 },
        { name: "Rezerve Alan", start: 14, end: 14 },
        { name: "GGMP İndeks", start: 15, end: 17 },
        { name: "Şimdiki/Önceki İşveren Göstergesi", start: 18, end: 18 },
        { name: "İşe Başlama Tarihi", start: 19, end: 26 },
        { name: "İşten Ayrılma Tarihi", start: 27, end: 34 },
        { name: "Çalıştığı Süre", start: 35, end: 38 },
        { name: "İşverenin Adı", start: 39, end: 68 },
        { name: "İşveren Adresi Satır 1", start: 69, end: 98 },
        { name: "İşveren Adresi Satır 2", start: 99, end: 128 },
        { name: "İşveren Adresi Satır 3", start: 129, end: 158 },
        { name: "İşveren Adresi Satır 4", start: 159, end: 188 },
        { name: "İşveren Adresi Posta Podu", start: 189, end: 198 },
        { name: "İşverenin Telefonu", start: 199, end: 214 }
    ],
    "GGS1": [
        { name: "Segment Kimliği", start: 1, end: 4 },
        { name: "Segment Uzunluğu", start: 5, end: 8 },
        { name: "Segment Sırası", start: 9, end: 10 },
        { name: "Segment Versiyon Numarası", start: 11, end: 12 },
        { name: "Rezerve Alan", start: 13, end: 13 },
        { name: "Rezerve Alan", start: 14, end: 14 },
        { name: "Başvuru Referans Numarası", start: 15, end: 34 },
        { name: "Başvuru Sahibine Ait Verinin Döndürülme Nedeni", start: 35, end: 35 },
        { name: "Döviz Kodu", start: 36, end: 38 },
        { name: "Döviz Böleni", start: 39, end: 39 },
        { name: "En Son Başvuru Kayıt Tarihi", start: 40, end: 47 },
        { name: "En Son Başvuru Kredi Türü", start: 48, end: 49 },
        { name: "En Son Başvuru Kredi Tutarı/Limiti", start: 50, end: 58 },
        { name: "En Son Başvuru Başvuru Sonucu", start: 59, end: 60 },
        { name: "En Son Başvuru Başvuru Sahibi Türü", start: 61, end: 61 },
        { name: "Son Bir Ay Sorgulama Sayısı (Üyenin Kendi Sorgulamaları + Diğer)", start: 62, end: 63 },
        { name: "Son Bir Ay Üyenin Yaptığı Sorgulama Sayısı", start: 64, end: 65 },
        { name: "Son Bir Ay Kabul Edilen Başvuru Sayısı", start: 66, end: 67 },
        { name: "Son Bir Ay Reddedilen Başvuru Sayısı", start: 68, end: 69 },
        { name: "Son Bir Ay Karar Verilmemiş Başvuru Sayısı", start: 70, end: 71 },
        { name: "Son Bir Ay Asıl/Müşterek Borçlu Başvuru Sahibi Olarak Sorgulanma Sayısı", start: 72, end: 73 },
        { name: "Son Bir Ay Asıl/Müşterek Borçlu Başvuru Olmayarak Sorgulanma Sayısı", start: 74, end: 75 },
        { name: "Son Bir Ay Rezerve Alan", start: 76, end: 81 },
        { name: "Son 2-3 Ay Sorgulama Sayısı (Üyenin Kendi Sorgulamaları + Diğer)", start: 82, end: 83 },
        { name: "Son 2-3 Ay Üyenin Yaptığı Sorgulama Sayısı", start: 84, end: 85 },
        { name: "Son 2-3 Ay Kabul Edilen Başvuru Sayısı", start: 86, end: 87 },
        { name: "Son 2-3 Ay Reddedilen Başvuru Sayısı", start: 88, end: 89 },
        { name: "Son 2-3 Ay Karar Verilmemiş Başvuru Sayısı", start: 90, end: 91 },
        { name: "Son 2-3 Ay Asıl/Müşterek Borçlu Başvuru Sahibi Olarak Sorgulanma Sayısı", start: 92, end: 93 },
        { name: "Son 2-3 Ay Asıl/Müşterek Borçlu Başvuru Olmayarak Sorgulanma Sayısı", start: 94, end: 95 },
        { name: "Son 2-3 Ay Rezerve Alan", start: 96, end: 101 },
        { name: "Son 4-6 Ay Sorgulama Sayısı (Üyenin Kendi Sorgulamaları + Diğer)", start: 102, end: 103 },
        { name: "Son 4-6 Ay Üyenin Yaptığı Sorgulama Sayısı", start: 104, end: 105 },
        { name: "Son 4-6 Ay Kabul Edilen Başvuru Sayısı", start: 106, end: 107 },
        { name: "Son 4-6 Ay Reddedilen Başvuru Sayısı", start: 108, end: 109 },
        { name: "Son 4-6 Ay Karar Verilmemiş Başvuru Sayısı", start: 110, end: 111 },
        { name: "Son 4-6 Ay Asıl/Müşterek Borçlu Başvuru Sahibi Olarak Sorgulanma Sayısı", start: 112, end: 113 },
        { name: "Son 4-6 Ay Asıl/Müşterek Borçlu Başvuru Olmayarak Sorgulanma Sayısı", start: 114, end: 115 },
        { name: "Son 4-6 Ay Rezerve Alan", start: 116, end: 121 },
        { name: "Son 6+ Ay Sorgulama Sayısı (Üyenin Kendi Sorgulamaları + Diğer)", start: 122, end: 123 },
        { name: "Son 6+ Ay Üyenin Yaptığı Sorgulama Sayısı", start: 124, end: 125 },
        { name: "Son 6+ Ay Kabul Edilen Başvuru Sayısı", start: 126, end: 127 },
        { name: "Son 6+ Ay Reddedilen Başvuru Sayısı", start: 128, end: 129 },
        { name: "Son 6+ Ay Karar Verilmemiş Başvuru Sayısı", start: 130, end: 131 },
        { name: "Son 6+ Ay Asıl/Müşterek Borçlu Başvuru Sahibi Olarak Sorgulanma Sayısı", start: 132, end: 133 },
        { name: "Son 6+ Ay Asıl/Müşterek Borçlu Başvuru Olmayarak Sorgulanma Sayısı", start: 134, end: 135 },
        { name: "Son 6+ Ay Rezerve Alan", start: 136, end: 141 },
        { name: "Rezerve Alan", start: 142, end: 160 }
    ],
    "GGS2": [
        { name: "Segment Kimliği", start: 1, end: 4 },
        { name: "Segment Uzunluğu", start: 5, end: 8 },
        { name: "Segment Sırası", start: 9, end: 10 },
        { name: "Segment Versiyon Numarası", start: 11, end: 12 },
        { name: "Rezerve Alan", start: 13, end: 13 },
        { name: "Rezerve Alan", start: 14, end: 14 },
        { name: "Başvuru Referans Numarası", start: 15, end: 34 },
        { name: "Başvuru Sahibine Ait Verinin Döndürülme Nedeni", start: 35, end: 35 },
        { name: "Döviz Kodu", start: 36, end: 38 },
        { name: "Döviz Böleni", start: 39, end: 39 },
        { name: "Hesabın Özel Durumu Göstergesi", start: 40, end: 40 },
        { name: "Asıl/Müşterek Borçlu Hesaplardaki Toplam Aylık Yükümlülük", start: 41, end: 49 },
        { name: "Sorgu Sonucu Dönen Toplam Kayıt Sayısı", start: 50, end: 52 },
        { name: "En Kötü Güncel Ödeme Durumu", start: 53, end: 53 },
        { name: "Sistemdeki En Kötü Ödeme Durumu", start: 54, end: 54 },
        { name: "Sorgu Sonucu Dönen Tüm Kayıtların Toplam Borç Bakiyesi", start: 55, end: 63 },
        { name: "Rezerve Alan", start: 64, end: 83 },
        { name: "Son 3 Ay Açık Kredi Hesapları Hesap Sayısı", start: 84, end: 86 },
        { name: "Son 3 Ay Açık Kredi Hesapları Toplam Borç Bakiyesi (Konut Kredileri Hariç)", start: 87, end: 95 },
        { name: "Son 3 Ay Açık Kredi Hesapları Toplam Borç Bakiyesi (Sadece Konut Kredileri)", start: 96, end: 104 },
        { name: "Son 3 Ay Açık Kredi Hesapları En Kötü Ödeme Durumu", start: 105, end: 105 },
        { name: "Son 4-12 Ay İçinde Açılan Açık Kredi Hesapları Hesap Sayısı", start: 106, end: 108 },
        { name: "Son 4-12 Ay İçinde Açılan Açık Kredi Hesapları Toplam Borç Bakiyesi (Konut Kredileri Hariç)", start: 109, end: 117 },
        { name: "Son 4-12 Ay İçinde Açılan Açık Kredi Hesapları Toplam Borç Bakiyesi (Sadece Konut Kredileri)", start: 118, end: 126 },
        { name: "Son 4-12 Ay İçinde Açılan Açık Kredi Hesapları En Kötü Ödeme Durumu 0-6 Ay", start: 127, end: 127 },
        { name: "Son 4-12 Ay İçinde Açılan Açık Kredi Hesapları En Kötü Ödeme Durumu 7-12 Ay", start: 128, end: 128 },
        { name: "Son 12 Aydan Önce Açılan Açık Kredi Hesapları Hesap Sayısı", start: 129, end: 131 },
        { name: "Son 12 Aydan Önce Açılan Açık Kredi Hesapları Toplam Borç Bakiyesi (Konut Kredileri Hariç)", start: 132, end: 140 },
        { name: "Son 12 Aydan Önce Açılan Açık Kredi Hesapları Toplam Borç Bakiyesi (Sadece Konut Kredileri)", start: 141, end: 149 },
        { name: "Son 12 Aydan Önce Açılan Açık Kredi Hesapları En Kötü Ödeme Durumu 0-6 Ay", start: 150, end: 150 },
        { name: "Son 12 Aydan Önce Açılan Açık Kredi Hesapları En Kötü Ödeme Durumu 7-12 Ay", start: 151, end: 151 },
        { name: "Tüm Açık Kredi Hesapları Hesap Sayısı", start: 152, end: 154 },
        { name: "Tüm Açık Kredi Hesapları Toplam Borç Bakiyesi (Konut Kredileri Hariç)", start: 155, end: 163 },
        { name: "Tüm Açık Kredi Hesapları Toplam Borç Bakiyesi (Sadece Konut Kredileri)", start: 164, end: 172 },
        { name: "Tüm Açık Kredi Hesapları En Kötü Ödeme Durumu 0-6 Ay", start: 173, end: 173 },
        { name: "Tüm Açık Kredi Hesapları En Kötü Ödeme Durumu 7-12 Ay", start: 174, end: 174 },
        { name: "Asıl/Müşterek Borçlu Olmadığı Açık Güncel Ödeme Durumu 0 Olan Hesap Sayısı", start: 175, end: 177 },
        { name: "Asıl/Müşterek Borçlu Olmadığı Açık Güncel Ödeme Durumu 0 Olan Hesapların Toplam Borç Bakiyesi (Konut Kredileri Dahil)", start: 178, end: 186 },
        { name: "Asıl/Müşterek Borçlu Olmadığı Açık Güncel Ödeme Durumu 0 Olan Hesapların Aylık Ödeme Yükümlülüğü", start: 187, end: 195 },
        { name: "Asıl/Müşterek Borçlu Olmadığı Açık Güncel Ödeme Durumu 1-6 Olan Hesap Sayısı", start: 196, end: 198 },
        { name: "Asıl/Müşterek Borçlu Olmadığı Açık Güncel Ödeme Durumu 1-6 Olan Hesapların Toplam Borç Bakiyesi (Konut Kredileri Dahil)", start: 199, end: 207 },
        { name: "Asıl/Müşterek Borçlu Olmadığı Açık Güncel Ödeme Durumu 1-6 Olan Hesapların Aylık Ödeme Yükümlülüğü", start: 208, end: 216 },
        { name: "Asıl/Müşterek Borçlu Olmadığı Açık Güncel Ödeme Durumu 0-6 Olmayan Hesap Sayısı", start: 217, end: 219 },
        { name: "Asıl/Müşterek Borçlu Olmadığı Açık Güncel Ödeme Durumu 0-6 Olmayan Hesapların Toplam Borç Bakiyesi (Konut Kredileri Dahil)", start: 220, end: 228 },
        { name: "Asıl/Müşterek Borçlu Olmadığı Açık Güncel Ödeme Durumu 0-6 Olmayan Hesapların Aylık Ödeme Yükümlülüğü", start: 229, end: 237 },
        { name: "Asıl/Müşterek Borçlu Olduğu Tüm Takipteki Hesapları Hesap Sayısı", start: 238, end: 240 },
        { name: "Asıl/Müşterek Borçlu Olduğu Tüm Takipteki Hesapları Toplam Borç Bakiyesi", start: 241, end: 249 },
        { name: "Asıl/Müşterek Borçlu Olduğu Tüm Takipteki Hesapları Son İdari/Kanuni Takipten Bu Yana Geçen Süre", start: 250, end: 251 },
        { name: "Asıl/Müşterek Borçlu Olduğu Tüm Takipteki Hesapları Sorgulanan Kişinin Kendi Hesaplarının Sayısı", start: 252, end: 254 },
        { name: "Asıl/Müşterek Borçlu Olduğu Son 12 Ay Gecikme Geçmişi 3-6 Veya Zarara Atılmış Kapalı Hesap Sayısı", start: 255, end: 257 },
        { name: "Asıl/Müşterek Borçlu Olduğu Son 12 Ay Gecikme Geçmişi 3-6 Veya Zarara Atılmış Kapalı Hesaplar İçin Son Kredi Kapanışından Bu Yana Geçen Süre", start: 258, end: 259 },
        { name: "Asıl/Müşterek Borçlu Olduğu Son 12 Ay Gecikme Geçmişi 3-6 Veya Zarara Atılmış Kapalı Hesaplar İçin Sorgulanan Kişinin Kendi Hesaplarının Sayısı", start: 260, end: 262 },
        { name: "Asıl/Müşterek Borçlu Olduğu Son 12 Ay Gecikme Geçmişi 1-2 Kapalı Hesap Sayısı", start: 263, end: 265 },
        { name: "Asıl/Müşterek Borçlu Olduğu Son 12 Ay Gecikme Geçmişi 1-2 Kapalı Hesaplar İçin Son Kredi Kapanışından Bu Yana Geçen Süre", start: 266, end: 267 },
        { name: "Asıl/Müşterek Borçlu Olduğu Son 12 Ay Gecikme Geçmişi 1-2 Kapalı Hesaplar İçin Sorgulanan Kişinin Kendi Hesaplarının Sayısı", start: 268, end: 270 },
        { name: "Asıl/Müşterek Borçlu Olduğu Son 12 Ay Gecikme Geçmişi 0,U,D,X Kapalı Hesap Sayısı", start: 271, end: 273 },
        { name: "Asıl/Müşterek Borçlu Olduğu Son 12 Ay Gecikme Geçmişi 0,U,D,X Kapalı Hesaplar İçin Son Kredi Kapanışından Bu Yana Geçen Süre", start: 274, end: 275 },
        { name: "Asıl/Müşterek Borçlu Olduğu Son 12 Ay Gecikme Geçmişi 0,U,D,X Kapalı Hesaplar İçin Sorgulanan Kişinin Kendi Hesaplarının Sayısı", start: 276, end: 278 },
        { name: "Asıl/Müşterek Borçlu Olmadığı Tüm Takipteki Hesapları Hesap Sayısı", start: 279, end: 281 },
        { name: "Asıl/Müşterek Borçlu Olmadığı Tüm Takipteki Hesapları Toplam Borç Bakiyesi", start: 282, end: 290 },
        { name: "Asıl/Müşterek Borçlu Olmadığı Tüm Takipteki Hesapları Son İdari/Kanuni Takipten Bu Yana Geçen Süre", start: 291, end: 292 },
        { name: "Asıl/Müşterek Borçlu Olmadığı Tüm Takipteki Hesapları Sorgulanan Kişinin Kendi Hesaplarının Sayısı", start: 293, end: 295 },
        { name: "Asıl/Müşterek Borçlu Olmadığı Son 12 Ay Gecikme Geçmişi 3-6 Veya Zarara Atılmış Kapalı Hesap Sayısı", start: 296, end: 298 },
        { name: "Asıl/Müşterek Borçlu Olmadığı Son 12 Ay Gecikme Geçmişi 3-6 Veya Zarara Atılmış Kapalı Hesaplar İçin Son Kredi Kapanışından Bu Yana Geçen Süre", start: 299, end: 300 },
        { name: "Asıl/Müşterek Borçlu Olmadığı Son 12 Ay Gecikme Geçmişi 3-6 Veya Zarara Atılmış Kapalı Hesaplar İçin Sorgulanan Kişinin Kendi Hesaplarının Sayısı", start: 301, end: 303 },
        { name: "Asıl/Müşterek Borçlu Olmadığı Son 12 Ay Gecikme Geçmişi 1-2 Kapalı Hesap Sayısı", start: 304, end: 306 },
        { name: "Asıl/Müşterek Borçlu Olmadığı Son 12 Ay Gecikme Geçmişi 1-2 Kapalı Hesaplar İçin Son Kredi Kapanışından Bu Yana Geçen Süre", start: 307, end: 308 },
        { name: "Asıl/Müşterek Borçlu Olmadığı Son 12 Ay Gecikme Geçmişi 1-2 Kapalı Hesaplar İçin Sorgulanan Kişinin Kendi Hesaplarının Sayısı", start: 309, end: 311 },
        { name: "Asıl/Müşterek Borçlu Olmadığı Son 12 Ay Gecikme Geçmişi 0,U,D,X Kapalı Hesap Sayısı", start: 312, end: 314 },
        { name: "Asıl/Müşterek Borçlu Olmadığı Son 12 Ay Gecikme Geçmişi 0,U,D,X Kapalı Hesaplar İçin Son Kredi Kapanışından Bu Yana Geçen Süre", start: 315, end: 316 },
        { name: "Asıl/Müşterek Borçlu Olmadığı Son 12 Ay Gecikme Geçmişi 0,U,D,X Kapalı Hesaplar İçin Sorgulanan Kişinin Kendi Hesaplarının Sayısı", start: 317, end: 319 },
        { name: "Asıl/Müşterek Borçlu Olduğu Son Dönemde Güncellenmeyen Tüm Hesaplar Hesap Sayısı", start: 320, end: 322 },
        { name: "Asıl/Müşterek Borçlu Olduğu Son Dönemde Güncellenmeyen Tüm Hesaplar En Kötü Ödeme Durumu Son 12 ay", start: 323, end: 323 },
        { name: "Asıl/Müşterek Borçlu Olmadığı Son Dönemde Güncellenmeyen Tüm Hesaplar Hesap Sayısı", start: 324, end: 326 },
        { name: "Asıl/Müşterek Borçlu Olmadığı Son Dönemde Güncellenmeyen Tüm Hesaplar En Kötü Ödeme Durumu Son 12 ay", start: 327, end: 327 },
        { name: "Kredi Hesapları Özet Dolgusu (Alan)", start: 328, end: 350 }
    ],
    "GGS9": [
        { name: "Segment Kimliği", start: 1, end: 4 },
        { name: "Segment Uzunluğu", start: 5, end: 8 },
        { name: "Segment Sırası", start: 9, end: 10 },
        { name: "Segment Versiyon Numarası", start: 11, end: 12 },
        { name: "Rezerve Alan", start: 13, end: 13 },
        { name: "Rezerve Alan", start: 14, end: 14 },
        { name: "Başvuru Referans Numarası", start: 15, end: 34 },
        { name: "Başvuru Sahibine Ait Verinin Döndürülme Nedeni", start: 35, end: 35 },
        { name: "VYŞ Özet Adedi", start: 36, end: 37 },
        { name: "Üye Kodu", start: 38, end: 42 },
        { name: "Üye adı", start: 43, end: 72 },
        { name: "Devir Alınan Üye Adedi", start: 73, end: 75 },
        { name: "Toplam Devir Bakiye Anapara", start: 76, end: 90 },
        { name: "Kalan Borç Bakiyesi", start: 91, end: 105 }
    ],
    "GGOH": [
        { name: "Segment Kimliği", start: 1, end: 4 },
        { name: "Segment Uzunluğu", start: 5, end: 8 },
        { name: "Segment Sırası", start: 9, end: 10 },
        { name: "Segment Versiyon Numarası", start: 11, end: 12 },
        { name: "Sıkıştırılmış Veri Göstergesi", start: 13, end: 13 },
        { name: "Rezerve Alan", start: 14, end: 14 },
        { name: "Ayraç Karakter", start: 15, end: 15 },
        { name: "Ayraç Alt Karakter", start: 16, end: 16 },
        { name: "Hata Tipi", start: 17, end: 17 },
        { name: "Mesaj Kodu", start: 18, end: 20 },
        { name: "Sorgu Referans Numarası", start: 21, end: 40 },
        { name: "Çıktı Referans Numarası", start: 41, end: 60 }
    ],
    "GGOE": [
        { name: "Segment Kimliği", start: 1, end: 4 },
        { name: "Segment Uzunluğu", start: 5, end: 8 },
        { name: "Segment Sırası", start: 9, end: 10 },
        { name: "Segment Versiyon Numarası", start: 11, end: 12 },
        { name: "Rezerve Alan", start: 13, end: 13 },
        { name: "Rezerve Alan", start: 14, end: 14 },
        { name: "Rezerve Alan", start: 15, end: 15 }
    ],
    "GGSS": [
        { name: "Segment Kimliği", start: 1, end: 4 },
        { name: "Segment Uzunluğu", start: 5, end: 8 },
        { name: "Segment Sırası", start: 9, end: 10 },
        { name: "Segment Versiyon Numarası", start: 11, end: 12 },
        { name: "Rezerve Alan", start: 13, end: 13 },
        { name: "Rezerve Alan", start: 14, end: 14 },
        { name: "Başvuru Referans No", start: 15, end: 34 },
        { name: "Başvuru Sahibine Ait Verinin Döndürülme Nedeni", start: 35, end: 35 },
        { name: "Başvuru", start: 36, end: 36 },
        { name: "Kredi Hesapları", start: 37, end: 37 },
        { name: "Rezerve Alan", start: 38, end: 38 },
        { name: "Rezerve Alan", start: 39, end: 39 },
        { name: "Rezerve Alan", start: 40, end: 40 },
        { name: "Rezerve Alan", start: 41, end: 41 },
        { name: "Rezerve Alan", start: 42, end: 42 },
        { name: "Rezerve Alan", start: 43, end: 43 },
        { name: "Rezerve Alan", start: 44, end: 55 },
        { name: "İdari Takipteki/Kanuni Takipteki Hesaplar", start: 56, end: 56 },
        { name: "Rezerve Alan", start: 57, end: 75 }
    ],
    "GGCI": [
        { name: "Segment Kimliği", start: 1, end: 4 },
        { name: "Segment Uzunluğu", start: 5, end: 8 },
        { name: "Segment Sırası", start: 9, end: 10 },
        { name: "Segment Versiyon Numarası", start: 11, end: 12 },
        { name: "Üyenin Kendi Verileri Göstergesi", start: 13, end: 13 },
        { name: "Rezerve Alan", start: 14, end: 14 },
        { name: "İlk GGAP Bilgilerinin İndeksi", start: 15, end: 17 },
        { name: "Rezerve Alan", start: 18, end: 20 },
        { name: "Rezerve Alan", start: 21, end: 22 },
        { name: "Rezerve Alan", start: 23, end: 25 },
        { name: "Üye Adı", start: 26, end: 55 },
        { name: "Üye Tipi", start: 56, end: 57 },
        { name: "Hesap Numarası", start: 58, end: 77 },
        { name: "Şube", start: 78, end: 85 },
        { name: "Birim", start: 86, end: 90 },
        { name: "Hesapla İlişkili Kişi Sayısı", start: 91, end: 91 },
        { name: "Döviz Kodu", start: 92, end: 94 },
        { name: "Döviz Böleni", start: 95, end: 95 },
        { name: "Açılış Tarihi", start: 96, end: 103 },
        { name: "Başvuru Referans Numarası", start: 104, end: 123 },
        { name: "Kredi Türü", start: 124, end: 125 },
        { name: "Faiz Oranı Göstergesi", start: 126, end: 126 },
        { name: "Kredi Başvuru Amacı", start: 127, end: 128 },
        { name: "Hesap Ödeme Durumu Güncellenme Tarihi", start: 129, end: 136 },
        { name: "Yeniden Yapılandırma/Sınıflandırma Göstergesi", start: 137, end: 137 },
        { name: "Tedbir Kararı Göstergesi", start: 138, end: 138 },
        { name: "Gecikme Gün Sayısı", start: 139, end: 140 },
        { name: "Kredi Teminat Göstergesi", start: 141, end: 141 },
        { name: "Kredi Tutarı", start: 142, end: 150 },
        { name: "Depozito Tutarı", start: 151, end: 159 },
        { name: "Sözleşme Süresi", start: 160, end: 162 },
        { name: "Ödeme Sıklığı", start: 163, end: 164 },
        { name: "Taksit Tutarı", start: 165, end: 173 },
        { name: "Son Taksit Tutarı", start: 174, end: 182 },
        { name: "Taksit Sayısı", start: 183, end: 185 },
        { name: "Ödeme Şekli", start: 186, end: 187 },
        { name: "Kredi Limiti", start: 188, end: 196 },
        { name: "Kayıttan Düşülen Tutar", start: 197, end: 205 },
        { name: "Nakit Çekim/Nakit Kullanım Tutarı", start: 206, end: 214 },
        { name: "Kredi Kartı Ekstre Ödeme Oranı", start: 215, end: 217 },
        { name: "Dönem İçi En Büyük Gecikme Gün Sayısı", start: 218, end: 219 },
        { name: "Rezerve Alan", start: 220, end: 221 },
        { name: "Hesap Ödeme Durumu (Aylık)", start: 222, end: 257 },
        { name: "En Kötü Ödeme Durumu", start: 258, end: 258 },
        { name: "Gecikmedeki Bakiye (Günlük)", start: 259, end: 267 },
        { name: "Kalan Toplam Taksit Bakiyesi", start: 268, end: 276 },
        { name: "Referans Numarası (Müşteri İtirazları İçin)", start: 277, end: 290 },
        { name: "Hesap Ödeme Durumu (Günlük)", start: 291, end: 291 },
        { name: "Rezerve Alan", start: 292, end: 295 },
        { name: "Toplam Borç Bakiyesi", start: 296, end: 304 },
        { name: "Kredi Bakiyesi Göstergesi", start: 305, end: 305 },
        { name: "Borç Faizine Konu Olan Bakiye", start: 306, end: 314 },
        { name: "Gecikmedeki Bakiye (Aylık)", start: 315, end: 323 },
        { name: "Vadesinde Yapılmayan Ödemelerin Toplam Sayısı", start: 324, end: 325 },
        { name: "İlk İdari Takip Bakiyesi", start: 326, end: 334 },
        { name: "İlk Kanuni Takip Bakiyesi", start: 335, end: 343 },
        { name: "Son Ödeme Tutarı", start: 344, end: 352 },
        { name: "Son Ödeme Tarihi", start: 353, end: 360 },
        { name: "Kapanış Tarihi", start: 361, end: 368 },
        { name: "İdari Takip Tarihi", start: 369, end: 376 },
        { name: "Kanuni Takip Tarihi", start: 377, end: 384 },
        { name: "Zarara Atılma/VYŞ’ye Devir/Tahsil Edilme Tarihi", start: 385, end: 392 },
        { name: "Hesabın Durumu", start: 393, end: 394 },
        { name: "Zarara Atılma/Kapanma Nedeni", start: 395, end: 396 },
        { name: "Hesabın Özel Durumu", start: 397, end: 397 },
        { name: "Yeniden Yapılandırma/Sınıflandırma Tarihi", start: 398, end: 405 },
        { name: "Hesabın Son Güncellenme Tarihi", start: 406, end: 413 },
        { name: "Rezerve Alan", start: 414, end: 414 },
        { name: "Hesabın Son Bildirilme Tarihi", start: 415, end: 422 },
        { name: "Eski Hesap Numarası", start: 423, end: 442 },
        { name: "Yeni Hesap Numarası", start: 443, end: 462 }
    ],
    "GGBS": [
        { name: "Segment Kimliği", start: 1, end: 4 },
        { name: "Segment Uzunluğu", start: 5, end: 8 },
        { name: "Segment Sırası", start: 9, end: 10 },
        { name: "Segment Versiyon Numarası", start: 11, end: 12 },
        { name: "Skor", start: 13, end: 16 },
        { name: "Skor Göstergesi", start: 17, end: 17 },
        { name: "Neden Kodu 1", start: 18, end: 19 },
        { name: "Neden Kodu 2", start: 20, end: 21 },
        { name: "Neden Kodu 3", start: 22, end: 23 },
        { name: "Neden Kodu 4", start: 24, end: 25 },
        { name: "Rezerve Alan", start: 26, end: 29 },
        { name: "Skor Hesaplanmama Neden Kodu", start: 30, end: 30 },
        { name: "Skor Modeli", start: 31, end: 32 },
        { name: "Rezerve Alan", start: 33, end: 39 },
        { name: "BBE İndeksi", start: 40, end: 41 },
        { name: "Rezerve Alan", start: 42, end: 50 },
        { name: "BEE Hesaplanmama Neden Kodu", start: 51, end: 51 },
        { name: "Veri Tipi Göstergesi", start: 52, end: 52 },
        { name: "Başvuru Sahibi Numarası", start: 53, end: 53 },
        { name: "Sahtekarlık Göstergesi", start: 54, end: 54 },
        { name: "Rezerve Alan", start: 55, end: 64 }
    ],
    "GGVM": [
        { name: "Segment Kimliği", start: 1, end: 4 },
        { name: "Segment Uzunluğu", start: 5, end: 8 },
        { name: "Segment Sırası", start: 9, end: 10 },
        { name: "Segment Versiyon Numarası", start: 11, end: 12 },
        { name: "ÜyeKodu", start: 13, end: 17 },
        { name: "Üye Adı", start: 18, end: 47 },
        { name: "Referans Numarası", start: 48, end: 63 },
        { name: "Kimlik Türü", start: 64, end: 64 },
        { name: "Kimlik Numarası", start: 65, end: 75 },
        { name: "İsim", start: 76, end: 90 },
        { name: "İkinci İsim", start: 91, end: 105 },
        { name: "Soyad", start: 106, end: 135 },
        { name: "Adres-1", start: 136, end: 255 },
        { name: "Adres-2", start: 256, end: 375 },
        { name: "Telefon Numarası-1", start: 376, end: 391 },
        { name: "Telefon Numarası-2", start: 392, end: 407 },
        { name: "Telefon Numarası-3", start: 408, end: 423 },
        { name: "E-Posta-1", start: 424, end: 473 },
        { name: "E-Posta-2", start: 474, end: 523 },
        { name: "Rezerve Alan", start: 524, end: 554 },
        { name: "Kalan Borç", start: 555, end: 569 },
        { name: "Döviz Kodu", start: 570, end: 572 },
        { name: "Rezerve Alan", start: 573, end: 634 },
        { name: "Borç Statüsü", start: 635, end: 635 },
        { name: "Kapanış Tarihi", start: 636, end: 643 },
        { name: "Önceki Borç Statüsü", start: 644, end: 644 },
        { name: "Önceki Kapanış Tarihi", start: 645, end: 650 },
        { name: "Sorgulamanın Girdisindeki Başvuru Sahipleri İçin En İyi Eşleşme", start: 651, end: 658 },
        { name: "Hesabın Son Bildirilme Tarihi", start: 659, end: 666 },
        { name: "Hesabın Son Güncellenme Tarihi", start: 667, end: 674 },
        { name: "Rezerve Alan", start: 675, end: 700 }
    ],
    "GGVD": [
        { name: "Segment Kimliği", start: 1, end: 4 },
        { name: "Segment Uzunluğu", start: 5, end: 8 },
        { name: "Segment Sırası", start: 9, end: 10 },
        { name: "Segment Versiyon Numarası", start: 11, end: 12 },
        { name: "ÜyeKodu", start: 13, end: 17 },
        { name: "Üye Adı", start: 18, end: 47 },
        { name: "Kimlik Türü", start: 48, end: 48 },
        { name: "Kimlik Numarası", start: 49, end: 59 },
        { name: "Hesap Numarası", start: 60, end: 79 },
        { name: "Devir Tarihi", start: 80, end: 87 },
        { name: "DevirAlınan Üye Kodu", start: 88, end: 92 },
        { name: "DevirAlınan Üye Adı", start: 93, end: 122 },
        { name: "DevirBakiye Anapara", start: 123, end: 137 },
        { name: "Döviz Kodu", start: 138, end: 140 },
        { name: "Hesap Açılış Tarihi", start: 141, end: 148 },
        { name: "Rezerve Alan", start: 149, end: 300 }
    ],
    "GGCP": [
        { name: "Segment Kimliği", start: 1, end: 4 },
        { name: "Segment Uzunluğu", start: 5, end: 8 },
        { name: "Segment Sırası", start: 9, end: 10 },
        { name: "Segment Versiyon Numarası", start: 11, end: 12 },
        { name: "Üyenin Kendi Verileri Göstergesi", start: 13, end: 13 },
        { name: "Rezerve Alan", start: 14, end: 14 },
        { name: "İlk GGAP Bilgilerinin İndeksi", start: 15, end: 17 },
        { name: "Rezerve Alan", start: 18, end: 20 },
        { name: "Rezerve Alan", start: 21, end: 22 },
        { name: "Rezerve Alan", start: 23, end: 25 },
        { name: "Üye Kodu", start: 26, end: 30 },
        { name: "Üye ÜrünKodu", start: 31, end: 33 },
        { name: "Sistem Tarafından Oluşturulan Referans Numarası", start: 34, end: 53 },
        { name: "Şube", start: 54, end: 61 },
        { name: "Birim", start: 62, end: 66 },
        { name: "Üye Adı", start: 67, end: 96 },
        { name: "Üye Türü", start: 97, end: 98 },
        { name: "Sorgu Tarihi", start: 99, end: 106 },
        { name: "Sorgu Zamanı", start: 107, end: 115 },
        { name: "Kullanıcı Adı", start: 116, end: 145 },
        { name: "Kullanıcı Telefon Numarası", start: 146, end: 161 },
        { name: "Başvuran Kişi Sayısı", start: 162, end: 162 },
        { name: "Döviz Kodu", start: 163, end: 165 },
        { name: "Döviz Böleni", start: 166, end: 166 },
        { name: "Başvuru Referans Numarası", start: 167, end: 186 },
        { name: "Kredi Türü", start: 187, end: 188 },
        { name: "Faiz Oranı Göstergesi", start: 189, end: 189 },
        { name: "Kredi Başvuru Amacı", start: 190, end: 191 },
        { name: "Satın Alınan Ürünün Referansı", start: 192, end: 203 },
        { name: "Teminatlı Kredi Göstergesi", start: 204, end: 204 },
        { name: "Kredi Tutarı", start: 205, end: 213 },
        { name: "Depozito Tutarı", start: 214, end: 222 },
        { name: "Sözleşme Süresi", start: 223, end: 225 },
        { name: "Ödeme Sıklığı", start: 226, end: 227 },
        { name: "Taksit Tutarı", start: 228, end: 236 },
        { name: "Son Taksit Tutarı", start: 237, end: 245 },
        { name: "Taksit Sayısı", start: 246, end: 248 },
        { name: "Ödeme Şekli", start: 249, end: 250 },
        { name: "Kredi Limiti", start: 251, end: 259 }
    ],
    "GGNS": [
        { name: "Segment Kimliği", start: 1, end: 4 },
        { name: "Segment Uzunluğu", start: 5, end: 8 },
        { name: "Segment Sırası", start: 9, end: 10 },
        { name: "Segment Versiyon Numarası", start: 11, end: 12 },
        { name: "Rezerve Alan", start: 13, end: 13 },
        { name: "Rezerve Alan", start: 14, end: 14 },
        { name: "GGNS İndeksi", start: 15, end: 17 },
        { name: "Başvuru/Hesap Sahibi Tipi", start: 18, end: 18 },
        { name: "Birinci Kimlik Tipi", start: 19, end: 19 },
        { name: "Birinci Kimlik Numarası", start: 20, end: 39 },
        { name: "İkinci Kimlik Tipi", start: 40, end: 40 },
        { name: "İkinci Kimlik Numarası", start: 41, end: 60 },
        { name: "Rezerve Alan", start: 61, end: 62 },
        { name: "Uyruk", start: 63, end: 64 },
        { name: "Unvan", start: 65, end: 74 },
        { name: "Soyadı", start: 75, end: 104 },
        { name: "Soyadı Eki", start: 105, end: 114 },
        { name: "İlk Ad", start: 115, end: 129 },
        { name: "İkinci Ad", start: 130, end: 144 },
        { name: "Rezerve Alan", start: 145, end: 174 },
        { name: "Rezerve Alan", start: 175, end: 204 },
        { name: "Anne Adı", start: 205, end: 219 },
        { name: "Baba Adı", start: 220, end: 234 },
        { name: "Cinsiyet Kodu", start: 235, end: 235 },
        { name: "Üye Adı", start: 236, end: 295 },
        { name: "Doğum Günü", start: 296, end: 303 },
        { name: "Doğum Yeri", start: 304, end: 333 },
        { name: "Kişinin Doğduğu İl/Bölge", start: 334, end: 363 },
        { name: "Doğum Yeri Kodu", start: 364, end: 373 },
        { name: "Rezerve Alan", start: 374, end: 374 }
    ],
    "GGAD": [
        { name: "Segment Kimliği", start: 1, end: 4 },
        { name: "Segment Uzunluğu", start: 5, end: 8 },
        { name: "Segment Sırası", start: 9, end: 10 },
        { name: "Segment Versiyon Numarası", start: 11, end: 12 },
        { name: "Rezerve Alan", start: 13, end: 13 },
        { name: "Rezerve Alan", start: 14, end: 14 },
        { name: "GGAD İndeksi", start: 15, end: 17 },
        { name: "Adres Tipi", start: 18, end: 18 },
        { name: "Şimdiki/Eski Adres Göstergesi", start: 19, end: 19 },
        { name: "Adrese Taşındığı Tarih", start: 20, end: 27 },
        { name: "Adresten Ayrıldığı Tarih", start: 28, end: 35 },
        { name: "Rezerve Alan", start: 36, end: 39 },
        { name: "Adres Detayları 1", start: 40, end: 69 },
        { name: "Adres Detayları 2", start: 70, end: 99 },
        { name: "Adres Detayları 3", start: 100, end: 129 },
        { name: "Adres Detayları 4", start: 130, end: 159 },
        { name: "Posta Kodu", start: 160, end: 169 }
    ],
    "GGPD": [
        { name: "Segment Kimliği", start: 1, end: 4 },
        { name: "Segment Uzunluğu", start: 5, end: 8 },
        { name: "Segment Sırası", start: 9, end: 10 },
        { name: "Segment Versiyon Numarası", start: 11, end: 12 },
        { name: "Rezerve Alan", start: 13, end: 13 },
        { name: "Rezerve Alan", start: 14, end: 14 },
        { name: "GGPD İndeksi", start: 15, end: 17 },
        { name: "Medeni Durum", start: 18, end: 19 },
        { name: "Bakmakla Yükümlü Olduğu Kişi Sayısı", start: 20, end: 20 },
        { name: "Gelir Sahibi Aile Fertlerinin Sayısı", start: 21, end: 21 },
        { name: "Gelir", start: 22, end: 30 },
        { name: "Gelir Sıklığı Göstergesi", start: 31, end: 31 },
        { name: "Net gelir/ Brüt Gelir Göstergesi", start: 32, end: 32 },
        { name: "Rezerve Alan", start: 33, end: 40 },
        { name: "İkamet Durumu", start: 41, end: 41 },
        { name: "Meslek Kodu/Tanımı", start: 42, end: 63 },
        { name: "EvTelefonu", start: 64, end: 79 },
        { name: "İş Telefonu", start: 80, end: 95 },
        { name: "Cep Telefonu", start: 96, end: 111 }
    ],
    "GGCV": [
        { name: "Segment Kimliği", start: 1, end: 4 },
        { name: "Segment Uzunluğu", start: 5, end: 8 },
        { name: "Segment Sırası", start: 9, end: 10 },
        { name: "Segment Versiyon Numarası", start: 11, end: 12 },
        { name: "Rezerve Alan", start: 13, end: 13 },
        { name: "Rezerve Alan", start: 14, end: 14 },
        { name: "Dönüştürme Girdilerinin Sayısı", start: 15, end: 17 },
        { name: "Dönüştürme Oranının Tarihi", start: 18, end: 25 },
        { name: "Döviz Kodu (Dönüştürülen)", start: 26, end: 28 },
        { name: "Döviz Kodu (Dönüşen)", start: 29, end: 31 },
        { name: "Dönüştürme Çarpanı (Döviz Kuru)", start: 32, end: 49 },
        { name: "Görüntüleme Faktörü", start: 50, end: 50 }
    ],
    "GGBD": [
        { name: "Segment Kimliği", start: 1, end: 4 },
        { name: "Segment Uzunluğu", start: 5, end: 8 },
        { name: "Segment Sırası", start: 9, end: 10 },
        { name: "Segment Versiyon Numarası", start: 11, end: 12 },
        { name: "Rezerve Alan", start: 13, end: 13 },
        { name: "Rezerve Alan", start: 14, end: 14 },
        { name: "GGBD İndeksi", start: 15, end: 17 },
        { name: "Banka Adı", start: 18, end: 47 },
        { name: "Banka Adresi Satırı 1", start: 48, end: 77 },
        { name: "Banka Adresi Satırı 2", start: 78, end: 107 },
        { name: "Banka Adresi Satırı 3", start: 108, end: 137 },
        { name: "Banka Adresi Satırı 4", start: 138, end: 167 },
        { name: "Banka Adresi Posta Kodu", start: 168, end: 177 },
        { name: "Banka ile Çalıştığı Süre", start: 178, end: 181 },
        { name: "Banka Kodu", start: 182, end: 201 },
        { name: "Banka Hesap Numarası", start: 202, end: 216 },
        { name: "Banka Hesap Türü", start: 217, end: 217 }
    ],
    "GGAF": [
        { name: "Segment Kimliği", start: 1, end: 4 },
        { name: "Segment Uzunluğu", start: 5, end: 8 },
        { name: "Segment Sırası", start: 9, end: 10 },
        { name: "Segment Versiyon Numarası", start: 11, end: 12 },
        { name: "Rezerve Alan", start: 13, end: 13 },
        { name: "Rezerve Alan", start: 14, end: 14 },
        { name: "GGAF İndeksi", start: 15, end: 17 },
        { name: "Adres Tipi", start: 18, end: 18 },
        { name: "Şimdiki/Eski Adres Göstergesi", start: 19, end: 19 },
        { name: "Adrese Taşındığı Tarih", start: 20, end: 27 },
        { name: "Adresten Ayrıldığı Tarih", start: 28, end: 35 },
        { name: "Rezerve Alan", start: 36, end: 39 },
        { name: "Adres Detayları 1", start: 40, end: 69 },
        { name: "Adres Detayları 2", start: 70, end: 99 },
        { name: "Adres Detayları 3", start: 100, end: 129 },
        { name: "Adres Detayları 4", start: 130, end: 159 },
        { name: "Posta Kodu", start: 160, end: 169 }
    ]
};

// Segment açıklamaları
const segmentDescriptions = {
    GGOH: "Çıktı Başlığı Bilgileri",
    GGOE: "Çıktı Sonu Bilgileri",
    GGSS: "Sorgu Özet Bilgileri",
    GGS1: "Başvuru Özet Bilgileri",
    GGS2: "Kredi Hesapları (CAIS) Özet Bilgileri",
    GGS9: "VYŞ Özet Bilgileri",
    GGCV: "Para Birimi Dönüştürme Bilgileri",
    GGAP: "Başvuru Sahibi Özet Bilgileri",
    GGCI: "Kredi Hesaplarının Finansal Bilgileri",
    GGBS: "Skor Bilgileri",
    GGVM: "VYŞ Müşteri ve Borç Bilgileri",
    GGVD: "VYŞ Devir Bilgileri",
    GGTK: "Kredi Hesaplarının geçmiş tarihli finansal bilgileri",
    GGCP: "Başvuru Bilgileri",
    GGNS: "İsim Detayları Bilgileri",
    GGAD: "Adres Detayları Bilgiler",
    GGAF: "Adres Detayları Bilgileri",
    GGPD: "Kişisel Detaylar Bilgiler",
    GGMP: "İşveren Detayları Bilgileri",
    GGBD: "Banka Detayları Bilgileri"
};

let gridApi = null;
let originalColumnDefs = null;
let originalRowData = null;
let isTransposed = false;

// | ve enter karakterlerini silen fonksiyon
function removePipes(text) {
    return text.replace(/[|\r\n]/g, '');
}

document.getElementById("parseBtn").addEventListener("click", () => {
    let text = document.getElementById("inputText").value;
    text = removePipes(text); // | karakterlerini kaldır
    if (!text.trim()) {
        alert("Lütfen metin giriniz.");
        return;
    }

    const segmentsFound = detectSegments(text);
    if (Object.keys(segmentsFound).length === 0) {
        alert("Tanımlı segment bulunamadı.");
        return;
    }

    renderTabs(segmentsFound);
    const firstSegment = Object.keys(segmentsFound)[0];
    renderGrid(firstSegment, segmentsFound);
});

function detectSegments(text) {
    let segmentsFound = {};
    let index = 0;

    while (index < text.length) {
        const segId = text.substring(index, index + 4);
        const segLenStr = text.substring(index + 4, index + 8);
        const segLen = parseInt(segLenStr, 10);

        if (!segmentList.includes(segId) || isNaN(segLen) || segLen <= 0) {
            console.warn(`Geçersiz veya tanımsız segment: ${segId}, atlanıyor...`);
            index += 4;
            continue;
        }

        const segText = text.substring(index, index + segLen);

        if (!segmentsFound[segId]) {
            segmentsFound[segId] = [];
        }
        segmentsFound[segId].push(segText);

        index += segLen;
    }

    return segmentsFound;
}

function renderTabs(segmentsFound) {
    const tabsContainer = document.getElementById("tabs");
    tabsContainer.innerHTML = "";
    tabsContainer.classList.add("tabs-vertical");

    // Başlık ekle
    let header = document.createElement("div");
    header.className = "tabs-header";
    header.innerText = "Sorgu Segmentleri";
    tabsContainer.appendChild(header);

    // Arama kutusu ekle
    let searchBox = document.createElement("input");
    searchBox.type = "text";
    searchBox.placeholder = "Segment ara...";
    searchBox.className = "segment-search-box";
    searchBox.style.margin = "10px 18px 8px 18px";
    searchBox.style.padding = "7px 12px";
    searchBox.style.width = "calc(100% - 36px)";
    searchBox.style.borderRadius = "6px";
    searchBox.style.border = "1px solid #b5d3f2";
    searchBox.style.fontSize = "15px";
    searchBox.style.background = "#f7f9fb";
    searchBox.style.color = "#1a2a3a";
    searchBox.style.outline = "none";
    searchBox.style.boxSizing = "border-box";
    searchBox.style.transition = "border 0.2s";
    searchBox.onfocus = function() { this.style.border = '#0078d7'; };
    searchBox.onblur = function() { this.style.border = '#b5d3f2'; };
    tabsContainer.appendChild(searchBox);

    // Segmentler için scrollable alan
    let scrollArea = document.createElement("div");
    scrollArea.className = "tabs-scroll-area";
    tabsContainer.appendChild(scrollArea);

    // Segmentleri oluşturacak fonksiyon
    function renderSegmentTabs(filterText = "") {
        scrollArea.innerHTML = "";
        Object.keys(segmentsFound).forEach((segmentName, idx) => {
            const desc = segmentDescriptions[segmentName] || '';
            if (
                filterText &&
                !segmentName.toLowerCase().includes(filterText.toLowerCase()) &&
                !desc.toLowerCase().includes(filterText.toLowerCase())
            ) return;
            const tab = document.createElement("div");
            tab.classList.add("tab");
            if (idx === 0 && !scrollArea.querySelector('.tab')) tab.classList.add("active");
            tab.innerHTML = `<div class="tab-title">${segmentName}</div><div class="tab-desc">${desc}</div><div class="tab-count">(${segmentsFound[segmentName].length})</div>`;
            tab.addEventListener("click", () => {
                document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
                tab.classList.add("active");
                renderGrid(segmentName, segmentsFound);
            });
            scrollArea.appendChild(tab);
        });
    }
    renderSegmentTabs();
    searchBox.addEventListener("input", function() {
        renderSegmentTabs(this.value);
    });
}

function renderGrid(segmentName, segmentsFound) {
    // Butonlar için yeni alanı seç
    const tableActions = document.getElementById("tableActions");
    if (tableActions) tableActions.innerHTML = "";

    // Excel'e Aktar butonu
    let exportBtn = document.createElement("button");
    exportBtn.id = "exportExcelBtn";
    exportBtn.innerText = "Excel'e Aktar";
    exportBtn.className = "table-action-btn";
    exportBtn.onclick = function() {
        if (gridApi) {
            gridApi.exportDataAsCsv({
                fileName: 'tablo.csv',
                columnSeparator: ';',
                processCellCallback: params => {
                    if (params.value === undefined || params.value === null) return '';
                    const val = String(params.value).replace(/"/g, '""');
                    return '="' + val + '"';
                }
            });
        }
    };
    tableActions.appendChild(exportBtn);

    // Kopyala butonu
    let copyBtn = document.createElement("button");
    copyBtn.id = "copyGridBtn";
    copyBtn.innerText = "Kopyala";
    copyBtn.className = "table-action-btn";
    copyBtn.onclick = function() {
        if (gridApi) {
            let csv = gridApi.getDataAsCsv({
                columnSeparator: '\t',
                processCellCallback: params => {
                    if (params.value === undefined || params.value === null) return '';
                    return "'" + String(params.value);
                }
            });
            navigator.clipboard.writeText(csv);
            copyBtn.innerText = "Kopyalandı!";
            setTimeout(() => { copyBtn.innerText = "Kopyala"; }, 1200);
        }
    };
    tableActions.appendChild(copyBtn);

    // Transpoze butonu (GGAP hariç)
    if (segmentName !== "GGAP") {
        let transposeBtn = document.createElement("button");
        transposeBtn.id = "transposeBtn";
        transposeBtn.innerText = "Transpoze";
        transposeBtn.className = "table-action-btn";
        transposeBtn.onclick = function() {
            if (!isTransposed) {
                transposeGrid(originalColumnDefs, originalRowData);
                isTransposed = true;
            } else {
                gridApi.setGridOption("columnDefs", originalColumnDefs);
                gridApi.setGridOption("rowData", originalRowData);
                isTransposed = false;
            }
        };
        tableActions.appendChild(transposeBtn);
    }

    const def = segmentDefinitions[segmentName];
    const segmentDataList = segmentsFound[segmentName];

    let columnDefs = [{ headerName: "Alan Adı", field: "alanAdi", pinned: "left" }];
    segmentDataList.forEach((_, idx) => {
        columnDefs.push({
            headerName: `Değer #${idx + 1}`,
            field: `deger${idx + 1}`
        });
    });

    let rowData = [];

    if (def) {
        rowData = def.map(field => {
            let row = { alanAdi: field.name };
            segmentDataList.forEach((segText, idx) => {
                row[`deger${idx + 1}`] = segText.substring(field.start - 1, field.end).trim();
            });
            return row;
        });
    } else {
        rowData.push({ alanAdi: "Tanım bulunamadı" });
    }

    if (!gridApi) {
        const gridOptions = {
            columnDefs: columnDefs,
            rowData: rowData,
            defaultColDef: {
                resizable: true,
                sortable: true,
                filter: true
            }
        };
        gridApi = agGrid.createGrid(document.getElementById("gridContainer"), gridOptions);
    } else {
        gridApi.setGridOption("columnDefs", columnDefs);
        gridApi.setGridOption("rowData", rowData);
    }
    // Orijinal veriyi sakla (her sekme değişiminde güncellenir)
    originalColumnDefs = JSON.parse(JSON.stringify(columnDefs));
    originalRowData = JSON.parse(JSON.stringify(rowData));
    isTransposed = false;
    // Transpoze butonuna tıklanınca tabloyu transpoze et
    if (transposeBtn) {
        transposeBtn.onclick = function() {
            if (!isTransposed) {
                transposeGrid(originalColumnDefs, originalRowData);
                isTransposed = true;
            } else {
                gridApi.setGridOption("columnDefs", originalColumnDefs);
                gridApi.setGridOption("rowData", originalRowData);
                isTransposed = false;
            }
        };
    }
}

// Tabloyu transpoze eden fonksiyon (GGAP hariç)
function transposeGrid(columnDefs, rowData) {
    // İlk sütun başlığı hariç (alanAdi), diğerlerini al
    const colHeaders = columnDefs.slice(1).map(col => col.headerName);
    const rowHeaders = rowData.map(row => row.alanAdi);
    // Yeni columnDefs: ilk sütun eski başlıklar, diğerleri eski satır başlıkları
    let newColumnDefs = [{ headerName: "", field: "col0", pinned: "left" }];
    rowHeaders.forEach((header, idx) => {
        newColumnDefs.push({ headerName: header, field: `col${idx+1}` });
    });
    // Yeni rowData: ilk satır başlığı eski sütun başlıkları, diğerleri eski değerler
    let newRowData = [];
    for (let i = 0; i < colHeaders.length; i++) {
        let row = { col0: colHeaders[i] };
        for (let j = 0; j < rowHeaders.length; j++) {
            row[`col${j+1}`] = rowData[j][`deger${i+1}`] || "";
        }
        newRowData.push(row);
    }
    gridApi.setGridOption("columnDefs", newColumnDefs);
    gridApi.setGridOption("rowData", newRowData);
}

function parseGGAPSegment(segmentText) {
    // Segment yoksa veya eksikse hata vermeden boş dizi döndür
    if (!segmentText || segmentText.length < 48) {
        return [];
    }
    // Sabit alanlar
    const fields = [
        { name: "Segment Kimliği", start: 1, end: 4 },
        { name: "Segment Uzunluğu", start: 5, end: 8 },
        { name: "Segment Sırası", start: 9, end: 10 },
        { name: "Segment Versiyon Numarası", start: 11, end: 12 },
        { name: "Rezerve Alan", start: 13, end: 13 },
        { name: "Rezerve Alan", start: 14, end: 14 },
        { name: "GGAP İndeksi", start: 15, end: 17 },
        { name: "Sorgulamanın Girdisindeki Başvuru Sahipleri İçin En İyi Eşleşme", start: 18, end: 35 },
        { name: "Başvuru Sahibine Ait Verinin Döndürülme Neden", start: 36, end: 36 },
        { name: "Rezerve Alan", start: 37, end: 46 },
        { name: "İndeks Girdilerinin sayısı", start: 47, end: 48 }
    ];
    let result = [];
    // Sabit alanları ekle
    fields.forEach(f => {
        result.push({ alanAdi: f.name, deger: segmentText.substring(f.start - 1, f.end).trim() });
    });
    // İndeks sayısı
    const indexCount = parseInt(segmentText.substring(46, 48), 10);
    let offset = 48; // 0-based, 49. karakterden başlar
    for (let i = 0; i < indexCount; i++) {
        // Segmentin devamı yoksa döngüyü kır
        if (segmentText.length < offset + 8) break;
        const segTur = segmentText.substring(offset, offset + 4).trim();
        const segSayi = segmentText.substring(offset + 4, offset + 5).trim();
        const segBasInd = segmentText.substring(offset + 5, offset + 8).trim();
        result.push({ alanAdi: `Segment Türü #${i + 1}`, deger: segTur });
        result.push({ alanAdi: `Segment Sayısı #${i + 1}`, deger: segSayi });
        result.push({ alanAdi: `Segment Başlama İndeks #${i +  1}`, deger: segBasInd });
        offset += 8;
    }
    return result;
}

// Tema değiştirme butonu ekle
window.addEventListener('DOMContentLoaded', function() {
    // Tema butonunu oluştur
    const themeBtn = document.createElement('button');
    themeBtn.id = 'themeToggleBtn';
    themeBtn.innerText = '🌙 Karanlık Tema';
    themeBtn.style.position = 'absolute';
    themeBtn.style.top = '18px';
    themeBtn.style.right = '30px';
    themeBtn.style.zIndex = '100';
    themeBtn.style.padding = '6px 18px';
    themeBtn.style.fontSize = '15px';
    themeBtn.style.borderRadius = '8px';
    themeBtn.style.background = '#e6f0fa';
    themeBtn.style.color = '#0078d7';
    themeBtn.style.border = '1px solid #b5d3f2';
    themeBtn.style.cursor = 'pointer';
    themeBtn.style.boxShadow = '0 1px 4px rgba(0,120,215,0.04)';
    themeBtn.style.transition = 'background 0.2s';
    themeBtn.onmouseover = function() { this.style.background = '#d0e7fa'; };
    themeBtn.onmouseout = function() { this.style.background = '#e6f0fa'; };
    document.body.appendChild(themeBtn);

    // Tema durumu localStorage'dan yükle
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
        themeBtn.innerText = '☀️ Açık Tema';
    }

    themeBtn.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        if (document.body.classList.contains('dark-theme')) {
            themeBtn.innerText = '☀️ Açık Tema';
            localStorage.setItem('theme', 'dark');
        } else {
            themeBtn.innerText = '🌙 Karanlık Tema';
            localStorage.setItem('theme', 'light');
        }
    });
});
