namespace MISA.Entities.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class update : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Customers", "customBirth", c => c.DateTime());
            AlterColumn("dbo.Customers", "debtOfMoney", c => c.Decimal(precision: 18, scale: 2));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Customers", "debtOfMoney", c => c.Decimal(nullable: false, precision: 18, scale: 2));
            AlterColumn("dbo.Customers", "customBirth", c => c.DateTime(nullable: false));
        }
    }
}
