using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MatricRides.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddRateToCarTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "HourlyRate",
                table: "Cars",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HourlyRate",
                table: "Cars");
        }
    }
}
