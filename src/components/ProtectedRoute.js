
/*
function ProtectedRoute ({ children, ...rest}) {
  return (
    <Route {...rest} render={() => {
      return fakeAuth.isAuthenticated ? children : <Redirect to='/login' />
      }} 
    />
  )
}

export default ProtectedRoute;
*/