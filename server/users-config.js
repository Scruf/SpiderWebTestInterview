ServiceConfiguration.configurations.remove({
    service: 'facebook'
});
 
ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: '237190349985766',
    secret: '538b66aa7c0290dedbc319909cfe2e7e',
    requestPermissions:['publish_pages','publish_actions','manage_pages','user_posts']
});