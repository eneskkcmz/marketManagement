# Market Yönetim Sistemi

**Proje Açıklaması:**
Bu proje, market yönetimi için geliştirilmiş kapsamlı bir yönetim sistemidir. Market yöneticileri, marketin bağlı olduğu reyonları ve reyon tiplerini kolayca yönetebilir, ürünleri reyonlara ekleyebilir, düzenleyebilir ve arama yaparak ilgili ürünlere hızlıca ulaşabilir. Sistem, aynı zamanda döviz kuru verilerini belirli aralıklarla API üzerinden çekerek güncel bilgileri görüntüler.

## Özellikler

- Market reyonlarının tanımlanması ve reyon tiplerine göre düzenlenmesi
- Reyonlara ürün eklenmesi
- Ürünlerin düzenlenmesi ve güncellenmesi
- Reyon tipi bazında ürün düzenlemesi
- Ürün arama özelliği (Search)
- Döviz kuru verilerinin (USD, EUR, GBP) API üzerinden çekilerek düzenli güncellenmesi (30 saniyede bir)
- Kullanıcı dostu arayüz ve responsive tasarım

## Başlangıç

Bu projeyi yerel ortamınıza kurmak ve çalıştırmak için aşağıdaki adımları izleyin.

### Gereksinimler

Projeyi çalıştırmak için gerekli araçlar:

- [Node.js](https://nodejs.org/) (12.x veya üzeri)
- [Angular CLI](https://angular.io/cli) (v12 veya üzeri)

## Kullanım

Projenin temel kullanımına dair adımlar:

1. **Reyon Ekleme::**

- Ana sayfadaki "Yeni Reyon Ekle" butonuna tıklayın.
- Açılan formda reyon bilgilerini doldurup "Kaydet" butonuna tıklayın.

2. **Reyon Tipine Göre Ürün Ekleme:**

- Eklenecek ürünün ait olduğu reyonu seçin.
- Reyon tipine göre açılan formu doldurarak "Kaydet" butonuna tıklayın.

3. **Ürün Güncelleme:**

- Listelenen ürünlerin bulunduğu reyondaki ürüne tıklayın.
- Açılan formda gerekli güncellemeleri yapın ve "Kaydet" butonuna tıklayın.
- Açılan forma gerekli silme işlemi gerçekletilir.

4. **Ürün Arama:**

   - Arama çubuğunu kullanarak ürün ismi veya özelliklerine göre arama yapın.

5. **Döviz Kur Bilgisi:**
   - Navbar'da yer alan döviz kurları, API üzerinden 30 saniyede bir güncellenerek kullanıcıya gösterilmektedir.

### Kurulum

Projeyi yerel makinenize kurmak için aşağıdaki adımları izleyin:

1. **Depoyu klonlayın:**

   ```bash
   git clone https://github.com/eneskkcmz/marketManagement

   ```

2. **Ortam Değişkenlerini Yapılandırın:**

   Ortam değişkenlerini yapılandırma adımları 2 durumda kontrol edilmektedir.

   1. Projenin çalıştıtılması için repo'dan alındıktan sonra npm install ile gerekli paketlerin kurulması sağlanmalıdır.
   2. Dummy data yerine json server kullanıldığı için mpx json-server db.json "3000" portunda çalıştırılır.
   3. ng serve ile "4200" portunda proje ayağa kalkar.
