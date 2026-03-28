package com.app.domain.enums;

public enum TransactionType {
    // changing in this since the OCP may get violated.
    // multiple additions makes this usage redundant
    // code becomes verbose and illogical.


//  earlier ->  INCOME, EXPENSE;

    INCOME{
        @Override
        public double apply(double current, double amount){
            return current + amount;
        }
    },

    EXPENSE{
        @Override
        public double apply(double current, double amount){
            return current + amount;
        }
    };

    public abstract double apply(double current, double amount);

}
