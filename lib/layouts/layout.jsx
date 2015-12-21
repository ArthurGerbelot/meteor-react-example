MainLayout = React.createClass({
  render() {
    return <div>
      <header>
        [LOGO]
      </header>
      <main>
        {this.props.content()}
      </main>
      <footer>
        By ArthyFiciel
      </footer>
    </div>
  }
});