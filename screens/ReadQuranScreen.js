import { useState, useRef } from 'react';
import { StyleSheet, Text, View, FlatList, RefreshControl, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import useQuranData from './useQuranData';

const ITEMS_PER_PAGE = 10;

const ReadQuranScreen = () => {
    const { ayahData, loading, fetchQuranData } = useQuranData();
    const [currentPage, setCurrentPage] = useState(1);
    const [refreshing, setRefreshing] = useState(false);
    const [scrollIndex, setScrollIndex] = useState('');
    const flatListRef = useRef(null);

    const getCurrentPageData = (page) => {
        const startIdx = (page - 1) * ITEMS_PER_PAGE;
        return ayahData.slice(startIdx, startIdx + ITEMS_PER_PAGE);
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchQuranData();
        setCurrentPage(1);
        setRefreshing(false);
    };

    const onNextPage = () => {
        const nextPage = currentPage + 1;
        if (getCurrentPageData(nextPage).length > 0) {
            flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
            setCurrentPage(nextPage);
        }
    };

    const onPrevPage = () => {
        if (currentPage > 1) {
            flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
            setCurrentPage(currentPage - 1);
        }
    };

    const handleScrollToIndex = () => {
        const index = parseInt(scrollIndex, 10);
        if (!isNaN(index) && index >= 0 && index < ayahData.length) {
            const targetPage = Math.floor(index / ITEMS_PER_PAGE) + 1;
            const indexInPage = index % ITEMS_PER_PAGE;
            setCurrentPage(targetPage);
            setTimeout(() => {
                flatListRef.current?.scrollToIndex({ index: indexInPage, animated: true, viewPosition: 0 });
            }, 100);
        }
    };

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#fff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.scrollControls}>
                <TextInput
                    style={styles.indexInput}
                    placeholder="Ayah #"
                    placeholderTextColor="#999"
                    value={scrollIndex}
                    onChangeText={setScrollIndex}
                    keyboardType="numeric"
                />
                <TouchableOpacity style={styles.scrollButton} onPress={handleScrollToIndex}>
                    <Text style={styles.scrollButtonText}>Go</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                ref={flatListRef}
                data={getCurrentPageData(currentPage)}
                renderItem={({ item }) => <Item item={item} />}
                keyExtractor={item => item.Id.toString()}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#fff"]} />}
            />

            <View style={styles.navigationButtons}>
                {currentPage > 1 && (
                    <TouchableOpacity onPress={onPrevPage} style={styles.navButton}>
                        <Text style={styles.navButtonText}>←</Text>
                    </TouchableOpacity>
                )}
                <Text style={styles.pageIndicator}>Page {currentPage}</Text>
                <TouchableOpacity onPress={onNextPage} style={styles.navButton}>
                    <Text style={styles.navButtonText}>→</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const Item = ({ item }) => (
    <View style={styles.itemContainer}>
        <View style={styles.indexBadge}>
            <Text style={styles.indexText}>{item.Id}</Text>
        </View>
        <Text style={styles.arabicText}>{item.AyahText}</Text>
        <View style={styles.divider}>
            <Text style={styles.dividerText}>
                {item.SurahName} (Surah {item.SurahNumber}), Juz {item.ParahNumber}
            </Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#222', padding: 10 },
    scrollControls: { flexDirection: 'row', marginBottom: 10, alignItems: 'center' },
    indexInput: { flex: 1, backgroundColor: '#333', color: '#fff', borderRadius: 5, padding: 10, marginRight: 10 },
    scrollButton: { backgroundColor: '#444', padding: 10, borderRadius: 5 },
    scrollButtonText: { color: '#fff' },
    itemContainer: { marginBottom: 15, borderWidth: 1, borderColor: '#444', borderRadius: 8, padding: 10, backgroundColor: '#333' },
    indexBadge: { position: 'absolute', top: 10, left: 10, backgroundColor: '#555', borderRadius: 15, width: 30, height: 30, justifyContent: 'center', alignItems: 'center', zIndex: 1 },
    indexText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
    arabicText: { color: '#fff', fontSize: 18, textAlign: 'right', fontFamily: 'Amiri' },
    divider: { backgroundColor: '#555', padding: 5, alignItems: 'center', marginVertical: 5 },
    dividerText: { color: '#fff', fontSize: 14 },
    navigationButtons: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 },
    navButton: { backgroundColor: '#444', padding: 10, borderRadius: 5, marginHorizontal: 10 },
    navButtonText: { color: '#fff', fontSize: 20 },
    pageIndicator: { color: '#fff', fontSize: 16, marginHorizontal: 10 },
    loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#222' },
});

export default ReadQuranScreen;
