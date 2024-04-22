using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MatricRides.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddCityProvinceColumnsToCar : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "Cars",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Province",
                table: "Cars",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "City",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "Province",
                table: "Cars");
        }
    }
}
