function deleteProduct(id) {
    const result = confirm("Are you sure you want to delete the product?");
    if (result) {
        fetch(`/deleteProduct/${id}`, {   // Make sure the route is correct
            method: "POST"
        })
        .then(res => {
            if (res.ok) {
                location.reload();
            } else {
                console.error("Failed to delete product");
            }
        })
        .catch(err => console.error("Error:", err));
    }
}
