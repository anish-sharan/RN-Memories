import React from 'react'
import { Text, StyleSheet } from 'react-native';
import FontSize from '../../assets/FontSize';
import { Searchbar } from 'react-native-paper';

const SearchScreen = () => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);
    return (
        <>
            <Searchbar
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
                style={styles.searchBar}
            />
            <Text style={[styles.container]}>SearchScreen</Text>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        fontSize: FontSize.Heading,
        alignSelf: 'center',
        marginBottom: 10
    }
})

export default SearchScreen;
