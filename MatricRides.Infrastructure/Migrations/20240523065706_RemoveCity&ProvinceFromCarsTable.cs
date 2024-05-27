using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MatricRides.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class RemoveCityProvinceFromCarsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "City",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "Province",
                table: "Cars");

            
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cars_Addresses_AddressId",
                table: "Cars");

            migrationBuilder.DropIndex(
                name: "IX_Cars_AddressId",
                table: "Cars");

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
    }
}
