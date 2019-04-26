module.exports = {
  'findCollectionData': async (collectionType, keyword) => {
    let list = [];
    try {
      list = await collectionType.find(keyword);
    } catch (e) {
      list = [];
    }
    return list;
  },
}