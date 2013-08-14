package dao;

import java.sql.Connection;
public class DAOSupport
{
    protected java.sql.Connection connection;
    
    public DAOSupport(Connection connection)
    {
    	this.connection = connection; 
    }
}
