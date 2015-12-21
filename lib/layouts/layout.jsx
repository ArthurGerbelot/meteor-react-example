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
        By ArthyFiciel
      </footer>
    </div>
  }
});