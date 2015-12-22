MainLayout = React.createClass({
  render() {
    return <div>
      <header>
        <UserAccount />
        <div className="logo">
          [LOGO]
        </div>
      </header>
      <main className="container">
        {this.props.content()}
      </main>
      <footer>
        By <a href="https://github.com/ArthurGerbelot/meteor-react-example">ArthyFiciel</a>
      </footer>
    </div>
  }
});