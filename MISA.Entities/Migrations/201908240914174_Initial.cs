namespace MISA.Entities.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Customers",
                c => new
                    {
                        customID = c.Guid(nullable: false, defaultValueSql:"newid()",identity:true),
                        customNo = c.String(nullable:false),
                        customName = c.String(nullable:false),
                        customGroup = c.String(),
                        customPhoneNumber = c.String(nullable:false),
                        customBirth = c.DateTime(nullable: true),
                        companyName = c.String(),
                        taxNo = c.String(),
                        customEmail = c.String(),
                        customAddress = c.String(),
                        customNote = c.String(),
                        customMemberNo = c.String(),
                        customMemberRank = c.String(),
                        debtOfMoney = c.Decimal(nullable: false,defaultValueSql:"0", precision: 18, scale: 2),
                        stopFollowing = c.Boolean(nullable: false,defaultValueSql:"0"),
                    })
                .PrimaryKey(t => t.customID);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Customers");
        }
    }
}
