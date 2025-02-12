const AccountOrders: React.FC = () => {
  return (
    <div className="">
      <h1 className="text-2xl font-semibold mb-2">Đơn hàng của bạn</h1>
      <div className="recent-orders">
        <div className="table-responsive-block tab-all ">
          <table
            className="table table-cart table-order w-full"
            id="my-orders-table"
          >
            <thead className="border-b">
              <tr>
                <th>Đơn hàng</th>
                <th>Ngày</th>
                <th>Địa chỉ</th>
                <th>Giá trị đơn hàng</th>
                <th>TT thanh toán</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td colSpan={6}>
                  <p className="py-3 text-center">Không có đơn hàng nào.</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="paginate-pages pull-right page-account text-right col-xs-12 col-sm-12 col-md-12 col-lg-12"></div>
      </div>
    </div>
  );
};

export default AccountOrders;
