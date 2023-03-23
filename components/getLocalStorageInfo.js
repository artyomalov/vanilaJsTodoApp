export default function getLocalStorageInfo(storageItem) {
  const data = JSON.parse(localStorage.getItem(storageItem));
  if (!data || !Array.isArray(data)) {
    return [];
  }
  return data;
}
