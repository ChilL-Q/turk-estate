"""
Seed script for TurkEstate platform.
Run from backend/ directory: python -m scripts.seed
Requires: prisma db push (or migrate dev) to have been run first.
"""
import asyncio
import sys
import os

# Ensure backend/ is in path when running as module
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from prisma import Prisma

# ─── Turkish Geographic Data ─────────────────────────────────────────────────

CITIES = [
    {"id": 34, "name": "İstanbul"},
    {"id": 7,  "name": "Antalya"},
    {"id": 35, "name": "İzmir"},
    {"id": 6,  "name": "Ankara"},
]

# city_id → list of district names
DISTRICTS = {
    34: ["Kadıköy", "Beşiktaş", "Şişli", "Fatih", "Sarıyer", "Üsküdar"],
    7:  ["Muratpaşa", "Konyaaltı", "Alanya", "Manavgat"],
    35: ["Konak", "Karşıyaka", "Bornova", "Çeşme"],
    6:  ["Çankaya", "Keçiören", "Mamak"],
}

# district_name → list of neighborhood names
NEIGHBORHOODS = {
    "Kadıköy":    ["Caddebostan", "Moda", "Fenerbahçe", "Acıbadem"],
    "Beşiktaş":   ["Levent", "Etiler", "Bebek", "Balmumcu"],
    "Şişli":      ["Nişantaşı", "Mecidiyeköy", "Bomonti"],
    "Fatih":      ["Sultanahmet", "Laleli", "Balat"],
    "Sarıyer":    ["Tarabya", "Yeniköy", "İstinye"],
    "Üsküdar":    ["Çengelköy", "Beylerbeyi", "Kuzguncuk"],
    "Muratpaşa":  ["Lara", "Şirinyalı", "Konyaaltı"],
    "Konyaaltı":  ["Hurma", "Sarısu", "Uncalı"],
    "Alanya":     ["Mahmutlar", "Oba", "Avsallar"],
    "Manavgat":   ["Side", "Sorgun", "Çolaklı"],
    "Konak":      ["Alsancak", "Güzelyalı", "Hatay"],
    "Karşıyaka":  ["Bostanlı", "Mavişehir", "Tersane"],
    "Bornova":    ["Kazımdirik", "Erzene", "Doğanlar"],
    "Çeşme":      ["Alaçatı", "Ilıca", "Çiftlikköy"],
    "Çankaya":    ["Kızılay", "Gaziosmanpaşa", "Bahçelievler"],
    "Keçiören":   ["Etlik", "Bağlum", "Ovacık"],
    "Mamak":      ["Tuzluçayır", "Şaşmaz", "Hüseyin Gazi"],
}

# ─── Seed Agencies ────────────────────────────────────────────────────────────

SEED_AGENCIES = [
    # ── Агентства недвижимости ─────────────────────────────────────────────
    {
        "name": "Elite Brokers Turkey",
        "vkn": "1234567890",
        "ttyb": "3400512",
        "status": "VERIFIED",
        "agencyType": "AGENCY",
        "email": "info@elitebrokers.com.tr",
        "phone": "905321234567",
        "description": "Ведущее агентство недвижимости в Стамбуле. Специализируемся на элитных объектах и инвестиционной недвижимости под программу гражданства Турции.",
        "city": "İstanbul",
    },
    {
        "name": "TrustRealty Istanbul",
        "vkn": "9876543210",
        "ttyb": "3400513",
        "status": "VERIFIED",
        "agencyType": "AGENCY",
        "email": "contact@trustrealty.com.tr",
        "phone": "905339876543",
        "description": "Профессиональное агентство недвижимости в Кадыкёе. Полное юридическое сопровождение, помощь с ипотекой и переоформлением тапу.",
        "city": "İstanbul",
    },
    # ── Застройщики ────────────────────────────────────────────────────────
    {
        "name": "Antalya Grand Invest",
        "vkn": "1122334455",
        "ttyb": "0700201",
        "status": "VERIFIED",
        "agencyType": "DEVELOPER",
        "email": "info@antalyagrand.com.tr",
        "phone": "905422223344",
        "description": "Девелопер жилых комплексов на побережье Анталии. Более 2 000 сданных квартир, собственный архитектурный отдел. Продажа напрямую от застройщика.",
        "city": "Antalya",
    },
    {
        "name": "İzmir Metropol Yapı",
        "vkn": "6677889900",
        "ttyb": "3500210",
        "status": "VERIFIED",
        "agencyType": "DEVELOPER",
        "email": "sales@metropolyapi.com.tr",
        "phone": "905312334455",
        "description": "Крупнейший застройщик Измира. Реализуем масштабные жилые проекты в Карşıяке и Борнове. Рассрочка от застройщика на 36 месяцев.",
        "city": "İzmir",
    },
    # ── Частные риелторы ───────────────────────────────────────────────────
    {
        "name": "Aegean Independent Realty",
        "vkn": "5544332211",
        "ttyb": "3500001",
        "status": "VERIFIED",
        "agencyType": "REALTOR",
        "email": "hello@aegeanrealty.com.tr",
        "phone": "905352345678",
        "description": "Частный риелтор с 12-летним опытом на Эгейском побережье. Уникальные объекты в Чешме, Алачаты и Бодруме. Индивидуальный подбор под бюджет.",
        "city": "İzmir",
    },
    {
        "name": "Murat Demir — Риелтор",
        "vkn": "3344556677",
        "ttyb": "0700099",
        "status": "VERIFIED",
        "agencyType": "REALTOR",
        "email": "murat@demirproperty.com.tr",
        "phone": "905333445566",
        "description": "Сертифицированный риелтор в Анталии. Специализация: виллы и апартаменты для иностранных покупателей. Русский и английский языки.",
        "city": "Antalya",
    },
]

# ─── Seed Listings ────────────────────────────────────────────────────────────

# neighborhood_name, agency_index (0-2), and other fields
SEED_LISTINGS = [
    {
        "title": "3+1 Lüks Daire Caddebostan'da",
        "description": "Deniz manzaralı, akıllı ev sistemli yeni yapı. Kat mülkiyetli, iskanı var. Yatırım için ideal.",
        "price": 14500000.0,
        "currency": "TRY",
        "propertyType": "APARTMENT",
        "tapuStatus": "KAT_MULKIYETI",
        "iskan": True,
        "aidat": 2500.0,
        "krediyeUygun": True,
        "vatandasligaUygun": True,
        "rooms": "3+1",
        "bathrooms": 2,
        "netSquareMeters": 120.0,
        "grossSquareMeters": 145.0,
        "floor": 4,
        "totalFloors": 12,
        "buildingAge": 0,
        "latitude": 40.9594,
        "longitude": 29.0700,
        "neighborhood_name": "Caddebostan",
        "agency_idx": 0,
    },
    {
        "title": "2+1 Modern Daire Levent'te",
        "description": "Merkezi konumda, metro yakını. Kredi uyumlu, iskan tam. Ofis veya konut amaçlı ideal.",
        "price": 9800000.0,
        "currency": "TRY",
        "propertyType": "APARTMENT",
        "tapuStatus": "KAT_MULKIYETI",
        "iskan": True,
        "aidat": 1800.0,
        "krediyeUygun": True,
        "vatandasligaUygun": False,
        "rooms": "2+1",
        "bathrooms": 1,
        "netSquareMeters": 85.0,
        "grossSquareMeters": 100.0,
        "floor": 7,
        "totalFloors": 18,
        "buildingAge": 3,
        "latitude": 41.0800,
        "longitude": 29.0130,
        "neighborhood_name": "Levent",
        "agency_idx": 1,
    },
    {
        "title": "4+1 Nişantaşı'nda Prestijli Residence",
        "description": "Nişantaşı'nın kalbinde, yürüme mesafesinde her şey. Tam rezidans hizmetleri, concierge, havuz.",
        "price": 28000000.0,
        "currency": "TRY",
        "propertyType": "APARTMENT",
        "tapuStatus": "KAT_MULKIYETI",
        "iskan": True,
        "aidat": 6000.0,
        "krediyeUygun": False,
        "vatandasligaUygun": True,
        "rooms": "4+1",
        "bathrooms": 3,
        "netSquareMeters": 220.0,
        "grossSquareMeters": 260.0,
        "floor": 10,
        "totalFloors": 22,
        "buildingAge": 1,
        "latitude": 41.0477,
        "longitude": 28.9939,
        "neighborhood_name": "Nişantaşı",
        "agency_idx": 0,
    },
    {
        "title": "1+1 Yatırımlık Daire Alsancak'ta",
        "description": "İzmir'in gözde semti Alsancak'ta denize yakın, kiraya verilmeye hazır daire.",
        "price": 3200000.0,
        "currency": "TRY",
        "propertyType": "APARTMENT",
        "tapuStatus": "KAT_IRTIFAKI",
        "iskan": False,
        "aidat": 500.0,
        "krediyeUygun": True,
        "vatandasligaUygun": False,
        "rooms": "1+1",
        "bathrooms": 1,
        "netSquareMeters": 55.0,
        "grossSquareMeters": 65.0,
        "floor": 3,
        "totalFloors": 6,
        "buildingAge": 8,
        "latitude": 38.4370,
        "longitude": 27.1420,
        "neighborhood_name": "Alsancak",
        "agency_idx": 2,
    },
    {
        "title": "5+2 Özel Havuzlu Villa - Mahmutlar Alanya",
        "description": "Alanya'da Akdeniz manzaralı müstakil villa. Türk vatandaşlığına uygun, fiyat 400.000 USD üzeri.",
        "price": 1350000.0,
        "currency": "USD",
        "propertyType": "VILLA",
        "tapuStatus": "ARSA_TAPULU",
        "iskan": False,
        "aidat": 0.0,
        "krediyeUygun": False,
        "vatandasligaUygun": True,
        "rooms": "5+2",
        "bathrooms": 3,
        "netSquareMeters": 280.0,
        "grossSquareMeters": 350.0,
        "floor": 1,
        "totalFloors": 2,
        "buildingAge": 2,
        "latitude": 36.5444,
        "longitude": 32.0000,
        "neighborhood_name": "Mahmutlar",
        "agency_idx": 1,
    },
    {
        "title": "4+1 Deniz Manzaralı Villa - Lara Antalya",
        "description": "Antalya Lara'da özel bahçeli, yüzme havuzlu lüks villa. Sakin mahalle, güvenlik 7/24.",
        "price": 950000.0,
        "currency": "EUR",
        "propertyType": "VILLA",
        "tapuStatus": "KAT_MULKIYETI",
        "iskan": True,
        "aidat": 0.0,
        "krediyeUygun": False,
        "vatandasligaUygun": True,
        "rooms": "4+1",
        "bathrooms": 2,
        "netSquareMeters": 210.0,
        "grossSquareMeters": 280.0,
        "floor": 1,
        "totalFloors": 2,
        "buildingAge": 4,
        "latitude": 36.8344,
        "longitude": 30.8580,
        "neighborhood_name": "Lara",
        "agency_idx": 0,
    },
    {
        "title": "Şişli'de Kiralık Hazır Ofis - 350 m²",
        "description": "Mecidiyeköy iş merkezinde A-sınıfı ofis katı. Asma tavan, klima, fiber internet altyapısı.",
        "price": 18500000.0,
        "currency": "TRY",
        "propertyType": "COMMERCIAL",
        "tapuStatus": "KAT_MULKIYETI",
        "iskan": True,
        "aidat": 8000.0,
        "krediyeUygun": False,
        "vatandasligaUygun": False,
        "rooms": "Açık Plan",
        "bathrooms": 4,
        "netSquareMeters": 350.0,
        "grossSquareMeters": 400.0,
        "floor": 12,
        "totalFloors": 24,
        "buildingAge": 5,
        "latitude": 41.0668,
        "longitude": 28.9940,
        "neighborhood_name": "Mecidiyeköy",
        "agency_idx": 1,
    },
    {
        "title": "Konak İzmir'de Ticari Zemin Kat",
        "description": "Yoğun yaya trafiğine sahip ana caddede zemin kat ticari dükkan. Depo ve tuvalet mevcut.",
        "price": 5500000.0,
        "currency": "TRY",
        "propertyType": "COMMERCIAL",
        "tapuStatus": "KAT_MULKIYETI",
        "iskan": True,
        "aidat": 0.0,
        "krediyeUygun": True,
        "vatandasligaUygun": False,
        "rooms": "1",
        "bathrooms": 1,
        "netSquareMeters": 90.0,
        "grossSquareMeters": 95.0,
        "floor": 0,
        "totalFloors": 5,
        "buildingAge": 12,
        "latitude": 38.4192,
        "longitude": 27.1287,
        "neighborhood_name": "Güzelyalı",
        "agency_idx": 2,
    },
    {
        "title": "Side Manavgat'ta Yatırımlık Arazi - 2500 m²",
        "description": "Turistik bölgede imar durumu Villa olan 2500 m² arsa. Denize 800 metre, elektrik ve su altyapısı mevcut.",
        "price": 750000.0,
        "currency": "USD",
        "propertyType": "LAND",
        "tapuStatus": "ARSA_TAPULU",
        "iskan": False,
        "aidat": 0.0,
        "krediyeUygun": False,
        "vatandasligaUygun": True,
        "rooms": "-",
        "bathrooms": 0,
        "netSquareMeters": 2500.0,
        "grossSquareMeters": 2500.0,
        "floor": 0,
        "totalFloors": 0,
        "buildingAge": 0,
        "latitude": 36.7733,
        "longitude": 31.3883,
        "neighborhood_name": "Side",
        "agency_idx": 1,
    },
    {
        "title": "Alaçatı Çeşme'de Bağ Evi Arsası - 1200 m²",
        "description": "Alaçatı'nın hırka semtinde rüzgar değirmenleri manzaralı arsa. Bağımsız tapu, hissesiz.",
        "price": 4200000.0,
        "currency": "TRY",
        "propertyType": "LAND",
        "tapuStatus": "ARSA_TAPULU",
        "iskan": False,
        "aidat": 0.0,
        "krediyeUygun": False,
        "vatandasligaUygun": False,
        "rooms": "-",
        "bathrooms": 0,
        "netSquareMeters": 1200.0,
        "grossSquareMeters": 1200.0,
        "floor": 0,
        "totalFloors": 0,
        "buildingAge": 0,
        "latitude": 38.2779,
        "longitude": 26.3717,
        "neighborhood_name": "Alaçatı",
        "agency_idx": 2,
    },
]


async def main():
    db = Prisma()
    await db.connect()

    print("🌱 Seeding cities...")
    for city in CITIES:
        existing = await db.city.find_unique(where={"id": city["id"]})
        if not existing:
            await db.city.create(data=city)
            print(f"  ✓ City: {city['name']}")
        else:
            print(f"  · City already exists: {city['name']}")

    print("\n🌱 Seeding districts and neighborhoods...")
    for city_id, district_names in DISTRICTS.items():
        for district_name in district_names:
            district = await db.district.upsert(
                where={"name_cityId": {"name": district_name, "cityId": city_id}},
                data={
                    "create": {"name": district_name, "cityId": city_id},
                    "update": {},
                },
            )
            nbhd_names = NEIGHBORHOODS.get(district_name, [f"{district_name} Merkez"])
            for nbhd_name in nbhd_names:
                await db.neighborhood.upsert(
                    where={"name_districtId": {"name": nbhd_name, "districtId": district.id}},
                    data={
                        "create": {"name": nbhd_name, "districtId": district.id},
                        "update": {},
                    },
                )
    print("  ✓ Districts and neighborhoods seeded")

    print("\n🌱 Seeding seed user (admin)...")
    seed_user = await db.user.upsert(
        where={"email": "admin@turkestate.com"},
        data={
            "create": {
                "email": "admin@turkestate.com",
                "password": "HASHED_IN_PRODUCTION",
                "role": "SUPER_ADMIN",
                "firstName": "Admin",
                "lastName": "TurkEstate",
            },
            "update": {},
        },
    )
    print(f"  ✓ User: {seed_user.email}")

    print("\n🌱 Seeding agencies...")
    agencies_created = []
    for ag_data in SEED_AGENCIES:
        agency = await db.agency.upsert(
            where={"vkn": ag_data["vkn"]},
            data={"create": ag_data, "update": {"status": ag_data["status"]}},
        )
        agencies_created.append(agency)
        print(f"  ✓ Agency: {agency.name}")

    print("\n🌱 Seeding listings...")
    for template in SEED_LISTINGS:
        nbhd = await db.neighborhood.find_first(where={"name": template["neighborhood_name"]})
        if not nbhd:
            print(f"  ✗ Neighborhood not found: {template['neighborhood_name']}, skipping")
            continue

        agency = agencies_created[template["agency_idx"]]
        listing_data = {k: v for k, v in template.items() if k not in ("neighborhood_name", "agency_idx")}
        listing_data["neighborhoodId"] = nbhd.id
        listing_data["agentId"] = seed_user.id
        listing_data["agencyId"] = agency.id

        # Check if listing already exists by title to avoid duplicates on re-run
        existing = await db.listing.find_first(where={"title": listing_data["title"]})
        if existing:
            print(f"  · Listing already exists: {listing_data['title'][:50]}")
            continue

        listing = await db.listing.create(data=listing_data)
        print(f"  ✓ Listing: {listing.title[:50]}")

    await db.disconnect()
    print("\n✅ Seed complete!")


if __name__ == "__main__":
    asyncio.run(main())
