const { getVentasByDateRange } = require("../controllers/venta.controller");

describe("getVentasByDateRange", () => {
  // Mocking the request and response objects
  const req = {
    body: {
      startDate: "2024-03-01",
      endDate: "2024-03-31",
      idCompany: "65f5ee60ce0ee41a81558837",
    },
  };

  let res;

  beforeEach(() => {
    // Mocking the response object
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 400 if startDate or endDate are missing", async () => {
    delete req.body.startDate;

    await getVentasByDateRange(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      httpStatus: 400,
      message: "Fecha de inicio y Fecha de finalización son obligatorias.",
      status: "error",
      content: [],
    });
  });

  it("should return ventas if valid startDate and endDate are provided", async () => {
    await getVentasByDateRange(req, res);

    // Here you can add more expectations based on your test case
    expect(res.status).toHaveBeenCalledWith(); // Assuming HTTP_OK is 200
    expect(res.json).toHaveBeenCalled();
  });

  // Add more test cases as needed
});
