let app = getApp();
Page({
    data: {},
    onItemClick(ev) {
        my.alert({
            title: "aaaa",
            content: ev.detail.index,
        });
    },
});
