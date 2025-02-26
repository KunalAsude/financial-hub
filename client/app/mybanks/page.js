"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { CheckCircle2, Clock, Plus } from "lucide-react"
import RootLayout from "@/components/RootLayout"
import ProtectedRoute from "@/components/ProtectedRoute"

const mockBanks = [
  {
    id: "1",
    profileName: "Default",
    bankName: "My Bank 1",
    status: "verified",
    details: {
      accountName: "John Doe",
      accountNumber: "1234567890",
      swiftCode: "MYBKUS33",
      accountAddress: "123 Main St, New York, NY 10001",
      bankAddress: "456 Bank St, New York, NY 10002",
    },
  },
  {
    id: "2",
    profileName: "My personal bank 1",
    bankName: "My Bank 1",
    status: "submitted",
  },
  {
    id: "3",
    profileName: "My personal Bank*",
    bankName: "My Bank 1",
    status: "submitted",
  },
]

export default function MyBanksPage() {
  const [banks, setBanks] = useState(mockBanks)
  const [isAddingBank, setIsAddingBank] = useState(false)

  const handleAddBank = (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const newBank = {
      id: Date.now().toString(),
      profileName: formData.get("name"),
      bankName: formData.get("bankName"),
      status: "submitted",
      details: {
        accountName: formData.get("accountName"),
        accountNumber: formData.get("accountNumber"),
        swiftCode: formData.get("swiftCode"),
        accountAddress: formData.get("accountAddress"),
        bankAddress: formData.get("bankAddress"),
      },
    }

    setBanks([...banks, newBank])
    setIsAddingBank(false)
  }

  return (
    <RootLayout>
      <ProtectedRoute>
        <div className="container mx-auto py-8 px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-900">My Banks</h1>
            <Dialog open={isAddingBank} onOpenChange={setIsAddingBank}>
              <DialogTrigger asChild>
                <Button className="bg-teal-500 text-white hover:bg-teal-600">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Bank
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] bg-gray-50">
                <DialogHeader>
                  <DialogTitle className="text-xl font-semibold">Add New Bank</DialogTitle>
                  <DialogDescription className="text-gray-600">
                    Enter your bank account details below
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddBank} className="space-y-6 py-4">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-gray-700">Name*</Label>
                      <Input id="name" name="name" placeholder="Name of this account" className="mt-1.5 bg-white" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="accountName" className="text-gray-700">Account Name*</Label>
                        <Input id="accountName" name="accountName" placeholder="Account Name" className="mt-1.5 bg-white" required />
                      </div>
                      <div>
                        <Label htmlFor="accountNumber" className="text-gray-700">Account Number*</Label>
                        <Input
                          id="accountNumber"
                          name="accountNumber"
                          placeholder="Account Number"
                          className="mt-1.5 bg-white"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="bankName" className="text-gray-700">Bank Name*</Label>
                        <Input id="bankName" name="bankName" placeholder="Bank Name" className="mt-1.5 bg-white" required />
                      </div>
                      <div>
                        <Label htmlFor="swiftCode" className="text-gray-700">Swift Code*</Label>
                        <Input id="swiftCode" name="swiftCode" placeholder="Swift Code" className="mt-1.5 bg-white" required />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="accountAddress" className="text-gray-700">Account Address*</Label>
                      <Input
                        id="accountAddress"
                        name="accountAddress"
                        placeholder="Enter the physical address on that bank account"
                        className="mt-1.5 bg-white"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="bankAddress" className="text-gray-700">Bank Address*</Label>
                      <Input id="bankAddress" name="bankAddress" placeholder="Bank Address" className="mt-1.5 bg-white" required />
                    </div>
                  </div>
                  <div className="flex justify-end gap-4">
                    <Button type="button" variant="outline" onClick={() => setIsAddingBank(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-teal-500 hover:bg-teal-600">
                      Add Bank
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-6">
            {banks.map((bank) => (
              <Card key={bank.id} className=" w-full items-center  gap-4 rounded-xl border-0 border-gray-200 p-4 sm:gap-6 sm:p-6 ">
                <CardHeader className="flex flex-row justify-between items-start pb-4 w-full">
                  <div>
                    <CardTitle className="text-xl">{bank.profileName}</CardTitle>
                    <CardDescription>{bank.bankName}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {bank.status === "verified" ? (
                      <>
                        <CheckCircle2 className="h-5 w-5 text-teal-500" />
                        <span className="text-teal-500">Verified</span>
                      </>
                    ) : (
                      <>
                        <Clock className="h-5 w-5 text-yellow-500" />
                        <span className="text-yellow-500">Submitted</span>
                      </>
                    )}
                  </div>
                </CardHeader>
                {bank.details && (
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-gray-700">Account Name</Label>
                        <p className="mt-1 text-sm text-gray-900">{bank.details.accountName}</p>
                      </div>
                      <div>
                        <Label className="text-gray-700">Account Number</Label>
                        <p className="mt-1 text-sm text-gray-900">{bank.details.accountNumber}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-gray-700">Swift Code</Label>
                        <p className="mt-1 text-sm text-gray-900">{bank.details.swiftCode}</p>
                      </div>
                      <div>
                        <Label className="text-gray-700">Account Address</Label>
                        <p className="mt-1 text-sm text-gray-900">{bank.details.accountAddress}</p>
                      </div>
                    </div>
                    <div>
                      <Label className="text-gray-700">Bank Address</Label>
                      <p className="mt-1 text-sm text-gray-900">{bank.details.bankAddress}</p>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </ProtectedRoute>
    </RootLayout>
  )
}