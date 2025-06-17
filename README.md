Great — based on your provided repo URL [`https://github.com/Mekin-jema/Ambalay-Maps-v2.git`](https://github.com/Mekin-jema/Ambalay-Maps-v2.git), here's a tailored and complete `README.md` file for **Ambalay Maps v2**, assuming it's built with **Next.js**, **TypeScript**, **MapLibre GL**, and **Redux Toolkit**.

---

### ✅ `README.md` for [`Ambalay-Maps-v2`](https://github.com/Mekin-jema/Ambalay-Maps-v2)

````markdown
# 🗺️ Ambalay Maps v2

**Ambalay Maps v2** is a powerful, feature-rich, interactive mapping application built with **Next.js**, **TypeScript**, **MapLibre GL JS**, and **Redux Toolkit**. It supports multi-waypoint routing, POI discovery, elevation profiling, dynamic map styles, and a beautiful user experience.

> ✅ This is the updated version of the original Ambalay frontend, restructured using modern tools and best practices.

---

## ✨ Features

### 🧭 Dynamic Routing
- Draggable multi-waypoint routing
- Supports car, pedestrian, bicycle profiles
- Turn-by-turn instructions
- Elevation profiling with visual charts

### 📍 POI Discovery
- Search by categories (e.g., Restaurants, Hospitals)
- OpenStreetMap Overpass API integration
- Interactive markers with detailed popups

### 🗺️ Map Styling
- Multiple base map styles
- Light/Dark mode support
- Satellite and 3D toggle

### 👤 UX Enhancements
- User geolocation tracking
- Toast notifications
- Smooth UI animations
- Fully responsive design

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Mekin-jema/Ambalay-Maps-v2.git
cd Ambalay-Maps-v2
````

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Add environment variables

Create a `.env.local` file in the root of the project:

```env
VITE_MAP_API_KEY=your_maplibre_key
VITE_GEOAPIFY_KEY=your_geoapify_key
```

Replace with your actual API keys from [Maptiler/MapLibre](https://maptiler.com/maps/) and [Geoapify](https://www.geoapify.com/).

---

## 🧪 Running the App

```bash
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 🧩 Usage Example

In `pages/index.tsx`:

```tsx
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('@/components/map'), { ssr: false });

export default function Home() {
  return (
    <main className="w-full h-screen">
      <Map />
    </main>
  );
}
```

---

## ⚙️ Configuration & Customization

### 🔘 Map Styles

Edit `map-styles/variable-style.ts`:

```ts
export const variableStyles = [
  {
    name: "Light",
    url: "https://tiles.stadiamaps.com/styles/alidade_smooth.json",
  },
  {
    name: "Dark",
    url: "https://tiles.stadiamaps.com/styles/alidade_dark.json",
  }
];
```

### 🏷️ POI Categories

Edit `utils/category.ts`:

```ts
export const categories = [
  {
    name: "Restaurants",
    tag: "amenity=restaurant",
    icon: "restaurant",
    textColor: "#FF6D00",
  },
  {
    name: "Hospitals",
    tag: "amenity=hospital",
    icon: "hospital",
    textColor: "#D32F2F",
  },
];
```

---

## 📡 APIs Used

* **Routing**: [Valhalla](https://github.com/valhalla/valhalla), [OSRM](http://project-osrm.org/)
* **Geocoding**: [Geoapify](https://www.geoapify.com/), [Nominatim](https://nominatim.org/)
* **POIs**: [OpenStreetMap Overpass API](https://overpass-api.de/)

---

## 🛠️ Troubleshooting

| Issue                                                | Solution                                                 |
| ---------------------------------------------------- | -------------------------------------------------------- |
| `"Source cannot be removed while layer is using it"` | Always remove layers before their sources                |
| API Key errors                                       | Check `.env.local` and API usage limits                  |
| Missing icons                                        | Custom icons are handled gracefully using fallback logic |

---

## 📈 Performance Tips

* Debounce routing and geocoding API calls
* Use `React.memo` for static subcomponents
* Clean up listeners and sources on component unmount

---

## 🧰 Tech Stack

* [Next.js](https://nextjs.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [MapLibre GL JS](https://maplibre.org/)
* [Redux Toolkit](https://redux-toolkit.js.org/)
* [React Toastify](https://fkhadra.github.io/react-toastify/)
* [Recharts](https://recharts.org/)
* [Framer Motion](https://www.framer.com/motion/)
* [Lucide Icons](https://lucide.dev/)

---

## 📸 Screenshots

> *Add screenshots of routing, POI popups, 3D map mode, etc.*

---

## 🪪 License

MIT © 2025 [Mekin Jemal](https://github.com/Mekin-jema)

---

## 🤝 Contributing

Pull requests, feature suggestions, and improvements are welcome!

---

## 📬 Contact

Have questions or ideas?
📧 [mekinjemal999@gmail.com](mailto:mekinjemal999@gmail.com)
🔗 [LinkedIn](https://linkedin.com/in/mekin-jemal)

```

---

Would you like me to:
- Push this directly to your GitHub as a PR or file?
- Add sections like *backend integration*, *deployment to Vercel*, or *screenshots*?

Let me know how far you want to take it.
```
