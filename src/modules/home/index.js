const Home = r => require.ensure([], () => r(require('./home.vue')), 'Home');
export default Home;
