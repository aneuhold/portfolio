<footer class="someClass">
  <span class="header-6"
    >See the code for this website <a
      href="https://github.com/aneuhold/portfolio"
      rel="noopener noreferrer"
      target="_blank">here!</a
    ></span
  >
</footer>

<style lang="scss">
  @use '../global-styles/theme.scss';

  .someOtherStyle {
    font-size: 1;
  }

  footer {
    background-color: theme.$background;
    padding: calc(theme.$standard-spacing * 6);
    display: flex;
    flex-direction: column;
    width: 100%;
  }
</style>
