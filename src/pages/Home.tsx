import { ref, remove, set } from 'firebase/database';
import { db } from '../../firebase';
import BarcodeScanner from './Barcodescanner';

const Home = () => {
  const user = JSON.parse(localStorage.getItem('user')!);

  const updateBarcode = (value: any) => {
    const barcodeRef = ref(db, user._id);
    set(barcodeRef, { barcode: value });
  };

  const handleLogout = () => {
    const barcodeRef = ref(db, user._id);
  
    // Remove the barcode node from Firebase
    remove(barcodeRef)
      .then(() => {
        console.log("🔴 Barcode data removed.");
        localStorage.clear();
        window.location.reload();
      })
      .catch((error) => {
        console.error("❌ Error removing barcode data:", error);
        // Proceed with logout even if delete fails
        localStorage.clear();
        window.location.reload();
      });
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-6 flex flex-col items-center justify-center">
      <div className="w-full h-full">
        <div className="mb-4 text-center">
          <h1 className="text-xl md:text-2xl font-bold">Welcome, {user?.username}</h1>
        </div>

        <div className="w-full flex justify-center">
          <div className="w-full">
            <div className="aspect-[9/16] md:aspect-[16/9] rounded-lg overflow-hidden">
              <BarcodeScanner onDetected={updateBarcode} />
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
