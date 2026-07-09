# Installing Hard Disk Sentinel on Raspberry Pi (ARM64)

## 1. Download the ARM64 version

Download the **appropriate Hard Disk Sentinel package** for your Raspberry Pi from the official Hard Disk Sentinel website.

If your Raspberry Pi is running a 64-bit operating system, download the **HDSentinel ARMv8 (aarch64)** version.

To check your system architecture, run:

```bash
uname -m
```

Example output:

```text
aarch64
```

If the output is `aarch64`, download the **ARMv8 (aarch64)** version.

If you get a different result (for example `armv7l`), choose the package that matches your architecture.


## 2. Create the installation directory

```bash
sudo mkdir -p /hdsentinel
```

## 3. Move the downloaded archive

If the downloaded ZIP file is located on an external drive:
(in my case) --> mv (source) (dist)
```bash
sudo mv /mnt/hdd/HDSentinel-armv8.zip /hdsentinel
```

## 4. Navigate to the installation directory

```bash
cd /hdsentinel
```

## 5. Extract the archive

```bash
sudo unzip HDSentinel-armv8.zip
```

## 6. Make the binary executable

```bash
sudo chmod +x HDSentinel-armv8
```

## 7. Run Hard Disk Sentinel

```bash
sudo ./HDSentinel-armv8
```

If the installation was successful, Hard Disk Sentinel will display the detected storage devices and their SMART information.

## Optional: Verify the binary

You can verify that you downloaded the correct ARM64 executable by running:

```bash
file HDSentinel-armv8
```

The expected output should contain:

```text
ELF 64-bit LSB executable, ARM aarch64
```

If it shows `x86_64` or `ELF 32-bit`, you downloaded the wrong version for your Raspberry Pi.