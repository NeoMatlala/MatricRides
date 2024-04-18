using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MatricRides.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddProfilePicColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte[]>(
                name: "ProfilePicture",
                table: "Hosts",
                type: "Image",
                nullable: false,
                defaultValue: new byte[0]);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProfilePicture",
                table: "Hosts");
        }
    }
}
