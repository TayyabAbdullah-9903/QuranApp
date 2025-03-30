import { useState, useEffect } from 'react';

const API_URL = "http://api.alquran.cloud/v1/quran/quran-uthmani";

const useQuranData = () => {
    const [ayahData, setAyahData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchQuranData();
    }, []);

    const fetchQuranData = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error("Failed to fetch Quran data");
            const json = await response.json();
            
            const ayahs = json.data.surahs.flatMap(surah =>
                surah.ayahs.map(ayah => ({
                    Id: ayah.number,
                    AyahText: ayah.text,
                    SurahNumber: surah.number,
                    SurahName: surah.name,
                    ParahNumber: ayah.juz,
                }))
            );
            setAyahData(ayahs);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { ayahData, loading, error, fetchQuranData };
};

export default useQuranData;