using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Projekt_js.Server.Migrations
{
    /// <inheritdoc />
    public partial class init6 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AnnoucementId",
                table: "OrderConnectors");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AnnoucementId",
                table: "OrderConnectors",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
