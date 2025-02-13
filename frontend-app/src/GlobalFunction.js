const GlobalFunction = {
  isAdmin() {
    if (
      localStorage.getItem("role") != undefined &&
      localStorage.getItem("role") == 1
    ) {
      return true;
    }
    return false;
  },
  formatPrice(price) {
    return new Intl.NumberFormat().format(price) + "৳";
  },
};
export default GlobalFunction;
